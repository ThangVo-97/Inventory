import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
