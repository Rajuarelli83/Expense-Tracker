import React from 'react';
import {useState} from 'react';
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6';

const Input = ({value,name,type,placeholder,label,onChange}) => {
    const [showPassword,setShowPassword]= useState("");

    const toggleShowPassword =()=>{
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <label className="text-[13px] text-slate-800" htmlFor={name}>{label}</label>
            <div className="input-box">
                <input className="w-full bg-transparent outline-none"
                       type={type == "password" ? (showPassword ? 'text':"password") :type} 
                       placeholder={placeholder}
                       value={value}
                       onChange={(e)=>onChange(e)} 
                />
                {type==="password" && (
                    <>
                    {showPassword ?
                         (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={()=>toggleShowPassword()} />) :
                         (<FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={()=>toggleShowPassword()}  />)
                    }
                    </>

                )  }
            </div>

          
        </div>
    );
};

export default Input;