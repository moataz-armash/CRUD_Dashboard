import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const login = async () => {
        try {
            let response = await axios.post("https://cpvsiaaboyncpcyfahkm.supabase.com/auth/v1/token?grant_type=password");
            console.log(response);
         
            navigate("/");
        } catch (error) {
            console.error(error);
       
        }
    };

    const register = async () => {
        try {
            let response = await axios.post("https://cpvsiaaboyncpcyfahkm.supabase.com/auth/v1/signup");
            console.log(response);
        
            navigate("/login");
        } catch (error) {
            console.error(error);
           
        }
    };

    return (
        <AuthContext.Provider value={{ login, register }}>
            {children}
        </AuthContext.Provider>
    );
};
