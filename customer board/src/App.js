
import './App.css';
import Login from './component/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Read from './component/Read';
import Update from './component/Update';



function App() {
  



  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/read' element={<Read/>}/>
        <Route exact path='/update' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
