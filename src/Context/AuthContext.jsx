import {
  createContext,
  useEffect,
  useState,
  useContext,
  Children,
} from "react";
import { supabase } from "../Components/Supabase/Supabase";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("session");
    return saved ? JSON.parse(saved) : null;
  });

  const SignIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Error signing in:", error);
        return { success: false, error };
      }
      console.log("signed in successfully:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const Register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error registering user:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };
  useEffect(() => {
    const current = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      localStorage.setItem("session", JSON.stringify(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess) {
        localStorage.setItem("session", JSON.stringify(sess));
      } else {
        localStorage.removeItem("session");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const Logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("session");
    setSession(null);
  };
  return (
    <AuthContext.Provider value={{ session, Register, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
