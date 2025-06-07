import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import {useContext} from "react";
import {AuthContext} from './context/AuthContext';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {Link} from 'react-router-dom';

const App = () => {
  const {isAuthenticated} = useContext(AuthContext);
  console.log('my authen App: ', isAuthenticated)

  return (
    <>
      <BrowserRouter>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Home Inventory
            </Typography>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
        {/* margin header */}
        <div style={{marginTop: '64px'}}>
          <Routes sx={{}}>

            {/* {
  isAuthenticated ?
    (

      
    )
    :
    (
      <Route path='/login' element={<Login />} />
    ) */}


            {<Route path='/login' element={<Login />} />}
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
          </Routes>
        </div>


      </BrowserRouter>
    </>

  );
}

export default App;
