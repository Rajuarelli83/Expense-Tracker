import React,{useContext,useEffect,useState} from 'react';
import Avatar from "../Cards/Avatar";
import {useNavigate} from 'react-router-dom';
import {SIDE_MENU_DATA} from '../../utils/data';
import {UserContext} from '../../context/UserContext';
import Modal from "../../components/Layouts/Modal";
import toast from "react-hot-toast";

const SideMenu = ({activeMenu}) => {
    const {user,clearUser} =  useContext(UserContext);
    const [clickLogout,setClickLogout] = useState(false);

    const navigate= useNavigate();

    const handleClick = (route)=>{
        if(route==="logout"){
            setClickLogout(true);
            return;
        }
        navigate(route);
    }

    const handleLogout =()=>{
        toast.error("Log out Successful");
        localStorage.removeItem("accessToken");
        clearUser();
        navigate("/login");
    }

    return (
     <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[21px] z-20 ">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full "
          />
        ) : (
          <Avatar fullName={user?.fullName} />
        )}
        <h5 className="text-gray-950 font-medium leading-6">{user?.fullName.toUpperCase() || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center cursor-pointer gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
     {clickLogout &&
      <Modal title="Confirm Logout" onClose={()=>setClickLogout(false)}>
        <div className="text-center"><button className="border border-black cursor-pointer bg-purple-500 rounded-xl hover:bg-purple-700 p-2 text-white" onClick={handleLogout}>Logout</button></div>

      </Modal>}
   
    </div>);
};

export default SideMenu;