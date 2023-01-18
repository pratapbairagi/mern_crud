
import './App.css';
import { List } from './pages/home';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import Edit from './pages/edit';
import Add from './pages/add';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul style={{width:"100%", display:"flex", listStyle:"none", gap:"1px", textDecoration:"none"}}>
          <NavLink to="/" style={{textDecoration:'none'}}>
            <li style={{width:"max-content", padding:"4px 16px", fontWeight:"600", color:"teal"}}>Home</li>
          </NavLink>
          <NavLink to="/add" style={{textDecoration:'none'}}>
            <li style={{width:"max-content", padding:"4px 16px",fontWeight:"600", color:"teal"}}>Add</li>
          </NavLink>
        </ul>
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/add' element={<Add />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
