import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { SignIn } = useAuthContext(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await SignIn(email, password); 
      if (res.success) {
        toast.success("Signed in successfully");
        navigate("/"); 
      } else {
        const msg = res.error?.message || "Invalid credentials";
        toast.error(msg);
        setErr(msg);
      }
    } catch (error) {
      toast.error(error.message);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-700">
      <div className="w-100 bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-3">
          <h1 className="font-bold text-blue-900">User Management System</h1>
          <h2 className="mt-2 mb-1 font-bold">Sign in</h2>
          <h2>Enter your credentials to access your account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <h1 className="mb-2">Email</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <h1 className="mb-2">Password</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex mt-6 gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-blue-600 text-white py-2 rounded text-center disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <Link
              className="w-1/2 bg-gray-400 text-white py-2 rounded text-center"
              to="/register">
              Register
            </Link>
          </div>

          {err && <p className="text-red-500 mt-2">{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
