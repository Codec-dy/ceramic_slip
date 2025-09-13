import React, { useContext, useEffect, useState } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import { fetchData } from '../../crud'
import { Context } from '../../context/CeramicContext'
import DatePicker from 'react-datepicker'
import { format } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css'
import LineChartComp from '../../components/admin/LineChartComp'
import PieChartComp from '../../components/admin/PieChartComp'

const AdminLanding = () => {

  const [data, setData] = useState([])
  const { api } = useContext(Context)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [total, setTotal] = useState({revenue:0,forms:0,shippingCost:0})
  const [showCalender, setShowCalender] = useState(false)
  const [sortType,setSortType] = useState('All')
  const [filter, setFilter] = useState()
  

       useEffect(() => {
    fetchData(api + "api/getFormData", setData, 'all')
      }, [])
       useEffect(() => {
          let filtered = data;
  
          // Apply sortType filter
          if (sortType.toLowerCase() === "pending") {
              filtered = filtered.filter(item => item.status === "pending");
          } else if (sortType.toLowerCase() === "completed") {
              filtered = filtered.filter(item => item.status === "completed");
          }
  
          // Apply date filter if both dates are selected
          if (startDate && endDate) {
              filtered = filtered.filter(item => {
                  const date = new Date(item.date);
                  return date >= startDate && date <= endDate;
              });
          }
          setFilter(filtered);
          const totalRevenue = filtered.reduce((sum, item) => sum + (Number(item.totalCost) || 0), 0);
          const totalShipping = filtered.reduce((sum, item) => sum + (Number(item.shippingCost) || 0), 0);
          setTotal({...total, revenue: totalRevenue, forms: filtered.length, shippingCost: totalShipping});
          
      }, [startDate, endDate, data, sortType]);
      useEffect(() => {
        if (startDate && endDate) {
    setShowCalender(false);
  }
      },[startDate, endDate])

    const revenuePieData = [
          { name: "Filtered", value: total.revenue },
          { name: "Other", value: data.reduce((sum, item) => sum + (Number(item.totalCost) || 0), 0) - total.revenue }
      ];
    const formsPieData = [
        { name: "Filtered", value: total.forms },
        { name: "Other", value: data.length - total.forms }
    ];
    const shippingPieData = [
        { name: "Filtered", value: total.shippingCost },
        { name: "Other", value: data.reduce((sum, item) => sum + (Number(item.shippingCost) || 0), 0) - total.shippingCost }
    ];
  

 

  

  return (
    <AdminTemplate>
      <div className='flex flex-col items-center w-full gap-3'>
        <div className='text-2xl font-semibold text-center mt-4 mb-4'>
          Welcome to the Admin Dashboard
        </div>
        <div className='flex flex-row gap-4 items-center justify-center'>
        <div>
            <label className="font-semibold mb-2 block text-center">Sort By</label>
            <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300  text-sm p-4'>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
        </div>
        <div className='relative flex flex-col'>
          <label className="font-semibold mb-2 block text-center">Select Date Range</label>
          <input
            type="text"
            readOnly
            className="border-2 border-gray-300  text-sm p-4 w-full cursor-pointer"
            onClick={()=>setShowCalender(!showCalender)}
            value={
              startDate && endDate
                ? `${format(startDate, "MM/dd/yyyy")} — ${format(endDate, "MM/dd/yyyy")}`
                : "Select a date range"
            }
          />
          {showCalender && <div className="rounded absolute top-23 left-[-20px] z-5"><DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            
          /></div>}
          </div></div>
        <div className='flex flex-row justify-center  h-full w-full gap-7'>
          <PieChartComp data={revenuePieData} label={"Revenue"}  dollar={"yes"}/>
          <PieChartComp data={formsPieData} label={"Forms"}  dollar={"no"}/>
          <PieChartComp data={shippingPieData} label={"Shipping Cost"} dollar={"yes"}/>
        </div>
          <LineChartComp data={filter} /> 
        <div>

        </div>
      </div>
    </AdminTemplate>
  )
}

export default AdminLanding