import React from 'react';

const Register = () => {
    return (
      <div className="h-screen flex items-center justify-center bg-blue-800 ">
                  <div className="w-100 bg-white rounded-lg shadow-lg p-6">
                      <div className="text-center mb-3">
                          <h1 className=" font-bold text-blue-900">User Management System</h1>
                          <h2 className="mt-2 mb-1 font-bold">Register</h2>
                          <h2 >Enter your Email and passowrd to register</h2>
                      </div>

                      <form>
                          <div className="mt-4">
                              <h1 className=" mb-2">Email</h1>
                              <input type="text" placeholder="Enter your Email" className="w-full p-2  border rounded-lg"/>
                          </div>

                          <div className="mt-4">
                              <h1 className=' mb-2'>Password</h1>
                              <input type="password" placeholder="Enter your Password" className="w-full p-2  border rounded-lg "/>
                          </div>
                          <button className="w-full bg-blue-600 text-white py-2  mt-6 rounded ">Register </button>
                      </form>
                  </div>
              </div>
    );
};

export default Register;