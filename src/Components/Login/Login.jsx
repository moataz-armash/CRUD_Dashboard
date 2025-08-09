
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const { login} = useContext(AuthContext);
    
   

    return (
        <div className="h-screen flex items-center justify-center bg-blue-700 ">
            <div className="w-100 bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-3">
                    <h1 className=" font-bold text-blue-900">User Management System</h1>
                    <h2 className="mt-2 mb-1 font-bold">Sign in</h2>
                    <h2 >Enter your credentials to access your account</h2>
                
                </div>

                <form>
                    <div className="mt-4">
                        <h1 className=" mb-2">Username</h1>
                        <input type="text" placeholder="Enter your Email" className="w-full p-2  border rounded-lg" />
                    </div>

                    <div className="mt-4">
                        <h1 className=' mb-2'>Password</h1>
                        <input type="password" placeholder="Enter your Password" className="w-full p-2  border rounded-lg " />
                    </div>
                    <div className='flex mt-6 gap-3 '>
                        <button className="w-50 bg-blue-600 text-white py-2   rounded ">Sign In  </button>
                        <button className="w-50 bg-gray-400 text-white py-2  rounded ">Register</button>

                    </div>

                </form>
            </div>
        </div>

    );
};

export default Login;