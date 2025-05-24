import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, LineChart, ResponsiveContainer } from 'recharts'

const LineChartComp = ({data}) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if(data){
    const grouped = {};
    data.forEach(item => {
      const date = item.date; // or format as needed
      if (!grouped[date]) {
        grouped[date] = { totalCost: 0, count: 0 };
      }
      grouped[date].totalCost += Number(item.totalCost || 0);
      grouped[date].count += 1;
    });
    let charts = Object.entries(grouped).map(([date, values]) => ({
      date,
      totalCost: values.totalCost,
      NumberOfForms: values.count
    }));
    setChartData(charts);
  }
  }, [data])
  
  
  return (
    <div className='w-full h-[400px]'>
      <div className="text-lg font-semibold mb-2 text-center">Revenue & Form Count Per Date</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="totalCost" stroke="#8884d8" name="Total Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="NumberOfForms" stroke="#82ca9d" name="Form Count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComp