
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Game from './Game/Game';


function App() {
  

  return (
    < >
     <BrowserRouter>
      <header className='App-header'>
        <Header />
      </header>
      
        
      
   
      <Routes>
        <Route
        exact path='/'
        element={ <Main />}
        />
        <Route 
        exact path='/GameTime'
        element={ <Game />}
        />

          
      </Routes>
    </BrowserRouter>  

    <footer className='app-footer'>
        <p>Hope you enjoyed this app.</p>
      </footer>
    </>
  );
}

export default App;
