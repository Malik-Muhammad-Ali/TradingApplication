import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext()

export const AppContextProvider = ({children})=>{

  const [watchList, setWatchList] = useState( localStorage.getItem("WatchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]);

  useEffect(()=>{
    localStorage.setItem("WatchList", watchList)
  }, [watchList])

  const addStock = (stock)=>{
    if(watchList.indexOf(stock) === -1){
      setWatchList([...watchList, stock]);
      console.log(watchList)
    }
  }

  const removeStock = (stock)=>{
    setWatchList(watchList.filter((el)=>{
      return el !== stock
    }))
  }
  
  return <AppContext.Provider value={{ watchList, addStock, removeStock }}>
      {children}
    </AppContext.Provider>
}