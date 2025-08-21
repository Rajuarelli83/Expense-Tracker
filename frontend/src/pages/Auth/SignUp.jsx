import React,{useState,useContext} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from "../../components/Inputs/Input";
import {Link ,useNavigate} from 'react-router-dom';
import {validateEmail} from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';
import {UserContext} from '../../context/UserContext';
import {toast} from "react-hot-toast";


const SignUp = () => {
        const [profilePic,setProfilePic]=useState(null);
        const [fullName,setFullName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");

        const {updateUser} = useContext(UserContext);

        const [error,setError]=useState(null);
        
        const navigate =useNavigate();
 
        const handleSignUp = async (e)=>{
                e.preventDefault();
               
             
                if(!fullName){
                    setError("Please enter your Name.");
                    return;
                }
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
                        Please wait a moment to sign up
                    </div>,
                {
                    duration: 200, 
                });

                const formData = new FormData();
                formData.append("fullName", fullName);
                formData.append("email", email);
                formData.append("password", password);
                if (profilePic) formData.append("profilePic", profilePic);
              
        try{

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER
                ,formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            const {token ,user}=response.data;
            if(token)
            {
                localStorage.setItem("accessToken",token);
                updateUser(user);
                navigate("/dashboard");
                toast.success("Sign Up successful");
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
            <h3 className=" hidden md:block text-xl font-semobold text-black text-center">Create an Account</h3>
            <p className=" hidden md:block text-xs text-slate-700 mt-[5px] mb-6 text-center">Track your financial data expertly.</p>
           <p className=" block md:hidden text-xs text-slate-700 mt-[5px] mb-6 text-center">Register Now.</p>
           
           <form onSubmit={handleSignUp} >
            
             <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
                 <Input value={fullName} onChange={({target})=>setFullName(target.value)} label="Full Name" placeholder="Raju" type="text" />
                 <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" placeholder="raju@gamil.com" type="text" />
                 <div className="md:col-span-2">
                    <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" placeholder="Enter Password :" type="password" />
                 </div>
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <div className="col-span-2">
                         <button  type="submit" className="btn-primary">
                           SIGN UP
                        </button>
                </div>
                <p className="text-[14px] text-slate-800 mt-3">Already have an account ?
                    <Link to="/login" className="font-medium text-primary underline"> Login</Link>
                </p>
        </form>
        </div>
    
        </AuthLayout>
    );
};

export default SignUp;
