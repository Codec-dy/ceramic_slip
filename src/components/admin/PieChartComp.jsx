import React, { useEffect, useState } from 'react'

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const PieChartComp = ({data, label,dollar}) => {

    const [activeIndexRevenue, setActiveIndexRevenue] = useState(0)
      const [activeIndexForms, setActiveIndexForms] = useState(0)
      return (            
            <div className="flex flex-col items-center">
                <span className="mb-2 text-base font-semibold">{label}: {dollar=="yes"?"$":""}{data[0]["value"]}</span>
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={80}
                        cy={80}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        activeIndex={activeIndexRevenue}
                        
                        onMouseEnter={(_, index) => setActiveIndexRevenue(index)}
                        onMouseLeave={() => setActiveIndexRevenue(0)}
                    >
                            <Cell fill="#7E57C2" />
                        <Cell fill="#B0BEC5" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            
  )
}

export default PieChartComp