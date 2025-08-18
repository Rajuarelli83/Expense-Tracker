import React,{useState,useEffect} from 'react';
import {LuPlus} from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import {prepareIncomeBarChartData} from "../../utils/helper";



const IncomeOverview = ({ transactions, onAddIncome }) => { 
    const [chartData,setChartData] = useState([]);
    useEffect(()=>{
        const result =prepareIncomeBarChartData(transactions);
        setChartData(result);
        return ()=>{}
    },[transactions]);

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg lg:text-xl ">Income Overview</h5>
                <p className="text-sm lg:text-md text-gray-400 mt-0.5">Track your earnings over time and analyze. </p>
            </div>
            <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" /> Add Income 
            </button>
        </div>

        <div className="mt-10">
        <CustomBarChart path="/income" data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview;