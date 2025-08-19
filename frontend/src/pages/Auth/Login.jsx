import React,{useState,useContext} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from "../../components/Inputs/Input";
import {Link ,useNavigate} from 'react-router-dom';
import {validateEmail} from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';
import {UserContext} from '../../context/UserContext';
import {toast} from "react-hot-toast";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);
    const {updateUser} = useContext(UserContext);
    
    const navigate =useNavigate();

    const handleLogin = async (e)=>{

        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please Enter Password");
            return;
        }
        setError("");
           toast.custom(
            <div className="bg-purple-600/50 text-white border border-black-400 mt-2 px-4 py-2 rounded-lg shadow-lg">
                        Please wait ..Verifying user
            </div>,
                {
                    duration: 200, 
                }
        );
        //Login APi call 
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN
                ,{
                    email,
                    password,
                }
            );
            const {token ,user}=response.data;
            if(token)
            {
                localStorage.setItem("accessToken",token);
                updateUser(user);
                navigate("/dashboard");
                toast.success("Login successful");
            }
        }
        catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("Something went wrong ,please try again");
            }
        }

    }
 
    return (
        <AuthLayout >
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-xl font-semobold text-center text-black">Welcome</h3>
            <p className=" text-center text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
           <form onSubmit={handleLogin}>
            <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" placeholder="raju@gamil.com" type="text" />
            <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" placeholder="Enter Password :" type="password" />
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
                LOGIN
            </button>
            <p className="text-[14px] text-slate-800 mt-3">Don't have an account ?
                <Link to="/signup" className="font-medium text-primary underline"> SignUp</Link>
            </p>

        </form>
        </div>
    
        </AuthLayout>
    );
};

export default Login;