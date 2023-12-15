import React, { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import styled from "./Chart.module.css";
import { IoClose } from "react-icons/io5";
import { convertData } from "../../helpers/convertData";

const Chart = ({ chart, setChart }) => {
  const [type, setType] = useState("prices");

  const closeHanlder = () => {
    setChart(!chart);
  };

  const typeHandler = (event) =>{
    if(event.target.tagName === 'BUTTON'){
        const type = event.target.innerText.toLowerCase().replace(' ' , '_')
        setType(type)
    }

  }
  return (
    <div className={styled.modal}>
      <span className={styled.cross}>
        <IoClose onClick={closeHanlder} />
      </span>
      <div className={styled.chart}>
        <div className={styled.name}>
            <img src={chart.coin.image} alt={chart.coin.name} />
            <span>{chart.coin.name}</span>
        </div>
        <div className={styled.graph}>
          <ChartComponents data={convertData(chart, type)} type={type} /> 
        </div>
        <div className={styled.types} onClick={typeHandler}>
            <button className={type === 'prices' ? styled.selected : null}>Prices</button>
            <button className={type === 'market_caps' ? styled.selected : null}>Market Caps</button>
            <button className={type === 'total_volumes' ? styled.selected : null}>Total Volumes</button>
        </div>
        <div className={styled.ditails}>
            <div>
                <h4>Prices: </h4>
                <span> ${chart.coin.current_price}</span>
            </div>
            <div>
                <h4>ATH: </h4>
                <span> ${chart.coin.ath}</span>
            </div>
            <div>
                <h4>Market Caps: </h4>
                <span> ${chart.coin.market_cap}</span>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Chart;


const ChartComponents = ({data, type}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                width={400} 
                height={400} 
                data={data}>
                
               <Line type='monotone' dataKey={type} stroke="#3874ff" strokeWidth='2px'/>
               <CartesianGrid stroke="#404042" strokeDasharray="2 2"/>
                <YAxis dataKey={type} domain={['auto' , 'auto']}/>
                <XAxis dataKey='data' hide/>
                <Legend />
                <Tooltip />
            </LineChart>
          </ResponsiveContainer>
    )
}