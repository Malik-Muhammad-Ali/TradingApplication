import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
//Components
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailPage from './pages/StockDetailPage';
import { AppContextProvider } from './Context/context';
import Footer from './Components/Footer';

export default function App() {
  return (
    <main>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Sock Overview Page */}
            <Route  path='/'
                    element={<StockOverviewPage />}
            > 
            </Route>
            {/* Stock Detail Page */}
            <Route  path='/detail/:symbol' 
                    element={<StockDetailPage />}
            >
            </Route>
          </Routes>
        </BrowserRouter>
        
        <Footer />
      </AppContextProvider>
    </main>
  )
}
