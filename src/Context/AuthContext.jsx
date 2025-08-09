import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export let AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const login = async () => {
        try {
            let response = await axios.post("https://cpvsiaaboyncpcyfahkm.supabase.com/auth/v1/token?grant_type=password");
            console.log(response);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        }
    };

    const register = async () => {
        try {
            let response = await axios.post("https://cpvsiaaboyncpcyfahkm.supabase.com/auth/v1/signup");
            console.log(response);
            toast.success("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Registration failed");
        }
    };

    return (
        <AuthContext.Provider value={{ login, register }}>
            {children}
        </AuthContext.Provider>
    );
};
