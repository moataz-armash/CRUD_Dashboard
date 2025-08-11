import {  useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState("");

    const { session , Register} = useAuthContext();
     const navigate =useNavigate();
    const handleRegister = async(e)=>{
        e.preventDefault()
        setLoading(true);
        try {
            const result= await Register(Email,Password);
          if (result.success){
            navigate("/login");
          }
        } catch (error) {
            setError("Registration failed. Please try again.");
        }finally{
            setLoading(false);
        }
    }
    console.log(session)
    return (
      <div className="h-screen flex items-center justify-center bg-blue-800 ">
                  <div className="w-100 bg-white rounded-lg shadow-lg p-6">
                      <div className="text-center mb-3">
                          <h1 className=" font-bold text-blue-900">User Management System</h1>
                          <h2 className="mt-2 mb-1 font-bold">Register</h2>
                          <h2 >Enter your Email and passowrd to register</h2>
                      </div>

                      <form onSubmit={handleRegister}>
                          <div className="mt-4">
                              <h1 className=" mb-2">Email</h1>
                              <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email" className="w-full p-2  border rounded-lg"/>
                          </div>

                          <div className="mt-4">
                              <h1 className=' mb-2'>Password</h1>
                              <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your Password" className="w-full p-2  border rounded-lg "/>
                          </div>
                          <button type='submit' className="w-full bg-blue-600 text-white py-2  mt-6 rounded ">Register </button>
                          {Error && <p className="text-red-500 mt-2">{Error}</p>}
                      </form>
                  </div>
              </div>
    );
};

export default Register;