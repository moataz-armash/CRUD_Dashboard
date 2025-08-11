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
  const [session, setSession] = useState(undefined);

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
    const current = supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) =>
      setSession(sess)
    );
    return () => sub.subscription.unsubscribe();
  }, []);
  const Logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <AuthContext.Provider value={{ session, Register, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
