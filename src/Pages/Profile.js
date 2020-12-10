import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PasswordModal from '../Components/PasswordModal';
import CreatePost from './CreatePost';


const Profile = () => {
    return ( 
        <div className= "page">
        <h1 className = "page-title">Profile</h1>        
        <PasswordModal >Change password</PasswordModal>
        <button className = "btn"><Link to= '/create-posts' className= "post_link">Create A Post</Link></button>
        </div>
     );
}
 
export default Profile;