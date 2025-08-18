import React,{useState,useEffect} from 'react';
import {LuPlus} from "react-icons/lu";
import CustomLineChart from "../charts/CustomLineChart";
import {prepareExpenseLineChartData} from "../../utils/helper";

const ExpenseOverView = ({ transactions, onAddIncome }) => { 
    const [chartData,setChartData] = useState([]);
    useEffect(()=>{
        const result =prepareExpenseLineChartData(transactions);
        setChartData(result);
        return ()=>{}
    },[transactions]);

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg lg:text-xl ">Expense Overview</h5>
                <p className="text-sm lg:text-md text-gray-400 mt-0.5">Track your spendings  over time and analyze. </p>
            </div>
            <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" /> Add Expense 
            </button>
        </div>

        <div className="mt-10">
        <CustomLineChart path="/income" data={chartData} />
        </div>
    </div>
  )
}
 
export default ExpenseOverView;