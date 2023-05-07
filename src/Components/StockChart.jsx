import { useState } from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({chartData, symbol})=>{

  const { day,  week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("24h");

  const determineTimeFormat = ()=>{
    switch(dateFormat){
      case "24h":
        return day
      case "1w":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }

  const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? '#26C281' : '#ed3419'
  
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }
  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const buttonSelect = (button)=>{
    const classes = "btn m-1 "
    if(button === dateFormat){
      return classes + "btn-primary"
    }else{
      return classes + "btn-outline-primary"
    }
  }

  // Returning Component
  return(
    <div style={{backgroundColor: "rgb(145, 158, 171)"}} className='mt-5 m-5 p-4 shadow-sm bg-white'>
      <Chart style={{marginLeft: "20vw"}} options={options} series={series} type="area" width="70%"/>
      <div>
        <button className={buttonSelect("24h")} onClick={()=> setDateFormat("24h")}>24h</button>
        <button className={buttonSelect("1w")} onClick={()=> setDateFormat("1w")}>1w</button>
        <button className={buttonSelect("1y")} onClick={()=> setDateFormat("1y")}>1y</button>
      </div>
    </div>
  )
}

export default StockChart;