import { createContext,useEffect,useState,useContext, Children } from "react";
import { supabase } from "../Components/Supabase/Supabase";

const AuthContext = createContext();
export const AuthContextProvider= ({children})=>{
    const [session, setSession] = useState(undefined);

    const SignIn =async({email,password})=>{
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                console.error("Error signing in:", error);
                return { success: false, error };
            }
            console.log("signed in successfully:", data);
            return { success: true, data };
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    const Register =async(email,password) =>{
        const {data,error}=await supabase.auth.signUp({
            email:email,
            password: password,
        });
        if(error){
            console.error("Error registering user:", error);
            return{success: false, error};
        }
        return {success: true, data};
    }
     useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })
     } )
    return(
        <AuthContext.Provider value={{session,Register,SignIn}}>
        {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () =>{
    return useContext(AuthContext);
}