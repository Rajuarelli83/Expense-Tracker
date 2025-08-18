import React,{useState,useContext} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from "../../components/Inputs/Input";
import {Link ,useNavigate} from 'react-router-dom';
import {validateEmail} from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';
import {UserContext} from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';


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
                let profileImageUrl ="";
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
                
        try{
            if(profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl =imgUploadRes.imageUrl || "";

            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER
                ,{
                    fullName,
                    email,
                    password,
                    profileImageUrl,
                }
            );
            const {token ,user}=response.data;
            if(token)
            {
                localStorage.setItem("accessToken",token);
                updateUser(user);
                navigate("/dashboard");
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
            <h3 className="text-xl font-semobold text-black text-center">Create an Account</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6 text-center">Track your financial data expertly.</p>
           
           <form onSubmit={handleSignUp} >
            
             <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 <Input value={fullName} onChange={({target})=>setFullName(target.value)} label="Full Name" placeholder="Raju" type="text" />
                 <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" placeholder="raju@gamil.com" type="text" />
                 <div className="col-span-2">
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