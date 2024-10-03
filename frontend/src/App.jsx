import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage } from './components/Homepage';
import { Navbar } from './components/common/Navbar';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  return (
    <div className='bg-[#181a2a] overflow-hidden h-screen w-screen'>
      <Navbar className="h-[20%]" />
      <div className="h-[80%] p-4">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
