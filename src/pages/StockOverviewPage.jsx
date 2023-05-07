import StockList from '../Components/StockList';
import AutoComplete from '../Components/AutoComplete';
import Header from '../Components/Header';

const StockOverviewPage = ()=>{
  return(
    <div>
      <Header />
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default StockOverviewPage;