import Image from '../../assets/Image.png';
import { LuTrendingUpDown } from 'react-icons/lu';
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const {user}= useContext(UserContext);
    const token = localStorage.getItem("accessToken");
   useEffect(() => {
    if (token || user) {
      navigate("/dashboard");
    }
  }, [token, user]);

    return (
        <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 lg:pr-2 pt-8 pb-12">
            <h1 className="text-2xl font-medium text-purple-600">Expense Tracker</h1>
            {children}
        </div>
        <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative  ">
              <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute  -top-7 -left-5"></div>
              <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute   top-[30%] left-auto -right-10"></div>
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute  -bottom-7 -left-5 "></div>
                <div className="grid grid-cols-1 z-20">
                        <StatsInfoCard
                        icon={<LuTrendingUpDown className="m-3"/>}
                        label="Track your Income & Expense"
                        value="55,555"
                        color="bg-primary"
                         />
                </div>
                <img src={Image} className="top-auto bottom-10 lg:w-[70%] absolute  sm:rounded-2xl shadow-lg shadow-blue-400/15"/>
             
        </div>
        </div>
    );
};


export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className={`flex bg-white gap-6   p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10`}>
            <div className={`w-12 h-12 itmes-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`} >
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
                <span className="text-[20px]">₹{value}</span>
            </div>
        </div>
    );
}