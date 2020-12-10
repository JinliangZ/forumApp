import React, { Component, useContext} from 'react';
import logo from '../Images/logo.svg';
import {Link} from 'react-router-dom' ;
import AppContext from '../Contexts/AppContext';
import Button from '../Components/Button';




const Navbar = (props) => {
    const showNavbar =(e) =>{
        const navbar_submenu = document.querySelector('.navbar_submenu');
        if(navbar_submenu.style.display === 'none'){
          navbar_submenu.style.display = 'block';
        }else{
          navbar_submenu.style.display = 'none';
        }
    };
    const {user,setUser} = useContext(AppContext);

    const logout = ()=>{
        setUser(null);
        localStorage.setItem('token', null);
      };

    
    

    return ( 
        <div className = "navbar">
            {/* <img src={logo} className="navbar_logo" alt="logo"/> */}
            <span className="navbar_logo">iForum</span>

            <ul className="navbar_list">
                <li className="navbar_item navbar_submenu-container">
                <button><Link to= '/home' className = "navbar_link">Home</Link></button>
                </li>
                

               {!user ? <li className="navbar_item navbar_submenu-container" onClick={showNavbar}>
                    <button className="navbar_link" >Account</button>
                    <ul className="navbar_submenu">
                        <li className="navbar_submenu-item">
                            <Link to = '/login' className = "navbar_submenu-link">Log in</Link>
                        </li>
                        <li className="navbar_submenu-item">
                            <Link to = '/signup' className = "navbar_submenu-link">Sign up</Link>
                        </li>
                    </ul>
                </li> :(<li className="navbar_item navbar_submenu-container" onClick={showNavbar}>
                    <button className="navbar_link" >{user.username}</button>
                    <ul className="navbar_submenu">
                        <li className="navbar_submenu-item">
                            <Link to = '/profile' className = "navbar_submenu-link">Profile</Link>
                        </li>
                        <li className="navbar_submenu-item">
                            <Button type='button' className="btn-logout" logout={logout}>
                                LogOut
                            </Button>
                        </li>
                    </ul>
                </li>)}
                
                
            </ul>
        </div>
     );
}
 
export default Navbar;