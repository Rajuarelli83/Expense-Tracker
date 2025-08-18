import React from 'react';
import {getInitials} from "../../utils/helper";

const Avatar = ({fullName}) => {


    return( <div className={` w-14 h-14 text-xl  flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
                 {getInitials(fullName || "")}
        </div>);
};

export default Avatar;