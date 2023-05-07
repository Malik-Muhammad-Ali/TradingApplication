import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { AppContext } from '../Context/context';

const StockList = ()=>{

  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const { watchList, removeStock } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=>{
    let isMounted = true;
    const fetchData = async ()=>{
      try{
        const responses = await Promise.all(
          watchList.map((stock)=>{
            return finnHub.get("/quote", {
              params: {
                symbol: stock
              }
            })
          })
        )

       const data = responses.map((el)=>{
          return {
            data: el.data,
            symbol: el.config.params.symbol
          }
        });
        
        if(isMounted){
          setStock(data);
        }
        setLoading(false);
      }catch(error){
        console.log(error)
      }
    }
    fetchData();

    return ()=>(isMounted = false)
  }, [watchList])

  // Color Change Function
  const colorChange = (color)=>{
    return color > 0 ? 'success':'danger'
  }

  // Icon Change Function
  const iconChange = (icon)=>{
    return icon > 0 ? <BsFillCaretUpFill />: <BsFillCaretDownFill />
  }

  // Navigation Function
  const handleSelectStock = (symbol)=>{
    navigate(`detail/${symbol}`);
  }

  if(loading){
    return(
      <section className='section'>
        <h4>Loading...</h4>
      </section>
    )
  }

  // Returning the Component
  return(
    <table className='table hover mt-5'>
      <thead style={{color: "rgb(79,89,102)"}}>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Last</th>
          <th scope='col'>Chg</th>
          <th scope='col'>Chg%</th>
          <th scope='col'>High</th>
          <th scope='col'>Low</th>
          <th scope='col'>Open</th>
          <th scope='col'>Pclose</th>
        </tr>
      </thead>
      
      <tbody>
        {
          stock.map((stockData)=>{
            return (
              <tr className='table-row' key={stockData.symbol} onClick={()=>{handleSelectStock(stockData.symbol)}} style={{cursor: 'pointer'}}>
                <th scope='row'>{stockData.symbol}</th>
                <td scope='row'>{stockData.data.c}</td>
                <td scope='row' className={`text-${colorChange(stockData.data.d)}`}>{stockData.data.d} {iconChange(stockData.data.d)}</td>
                <td scope='row' className={`text-${colorChange(stockData.data.dp)}`}>{stockData.data.dp} {iconChange(stockData.data.dp)}</td>
                <td scope='row'>{stockData.data.h}</td>
                <td scope='row'>{stockData.data.l}</td>
                <td scope='row'>{stockData.data.o}</td>
                <td scope='row'>{stockData.data.pc}
                  <button 
                    className='btn btn-danger delete-btn' 
                    onClick={(e)=>{
                      e.stopPropagation()
                      removeStock(stockData.symbol)
                    }}>Remove</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default StockList;