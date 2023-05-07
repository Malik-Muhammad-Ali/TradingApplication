import { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import { AppContext } from '../Context/context';

const AutoComplete = ()=>{

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const { addStock } = useContext(AppContext);

  // show Drop Down Function
  const showDropdown = ()=>{
    return search.length > 0 ? 'show':''
  }

  useEffect(()=>{
    let isMounted = true;
    const fetchData = async ()=>{
      try{
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        })
        if(isMounted){
          setResult(response.data.result);
        }
      }catch(error){
        console.log(error)
      }
    }

    if(search.length>0){
      fetchData();
    }else{
      setResult([]);
    }

    return ()=> (isMounted = false)
  }, [search])
  
  return(
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input 
          style={{backgroundColor: 'rbga(145, 158, 171, 0.04)'}} 
          id='search' 
          type='text' 
          className='form-control' 
          placeholder='Search' 
          autoComplete='off' 
          value={search} 
          onChange={(e)=> setSearch(e.target.value)}
        />
        <label htmlFor='search'>Search</label>
        <ul className={`dropdown-menu ${showDropdown()}`} 
        style={{
          height: '500px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer'
        }}>
          {
            result.map((el)=>{
              return (
                <li 
                  key={el.symbol}
                  className='dropdown-item' 
                  onClick={()=>{
                    addStock(el.symbol)
                    setSearch('')
                  }}
                >{el.description} ({el.symbol})</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default AutoComplete;