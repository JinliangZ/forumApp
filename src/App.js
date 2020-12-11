import axios from "axios";
import React, { useState, useEffect } from 'react'
import AppContext from './Contexts/AppContext';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/CreatePost";
import HttpClient from "./Services/HttpClient";
import ManagePost from "./Pages/ManagePost";
import PostDetail from "./Pages/PostDetail";


function App() {
  

  useEffect(() => {
    init();
  }, []);

  const [isInitiated, setIsInitiated] = useState(false);
  const [user,setUser] = useState(null);  

  const init = async () =>{
    const token = localStorage.getItem('token');
    const {data} = await HttpClient().get('/api/v1/user/index');
    setUser(data.user);
    setIsInitiated(true);
  }

  return (
    <div>
        {isInitiated && (
          <AppContext.Provider value={{user,setUser}}>
            <Router>
              <Navbar />
              <Switch>
                <Route  path ='/home' exact>
                  <Home />  
                </Route>
                  
                <Route path = '/signup'>
                  {!user ? <Signup /> : <Redirect to = '/' />}
                </Route>

                <Route path = '/login'>
                  {!user ? <Login /> : <Redirect to = '/' />}
                </Route>

                <Route path = '/profile'>
                  {user ? <Profile /> : <Redirect to = '/login' />}
                </Route>

                <Route path = '/create-posts'>
                  {user ? <CreatePost /> : <Redirect to = '/login' />}
                </Route>

                <Route path = '/manage-posts'>
                  {user ? <ManagePost /> : <Redirect to = '/login' />}
                </Route>


                <Route path = '/posts-detail/:id'>
                  {user ? <PostDetail /> : <Redirect to = '/login' />}
                </Route>

                

              </Switch>
            </Router>
          </AppContext.Provider>                                            
        )}
    </div>
  );
}

export default App;
