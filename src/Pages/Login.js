import React, { Component ,useState, useContext } from 'react';
import FormErrors from '../Components/FormErrors';
import Button from '../Components/Button';
import axios from 'axios';
import AppContext from '../Contexts/AppContext';
import { useHistory } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {user,setUser} = useContext(AppContext);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors([]);
        let _errors = [];
       
        if(!username){ _errors.push('Username is required!')}else{_errors.push("")};
        if(!password){ _errors.push('Password is required!')}else{_errors.push("")};
        if(_errors.length){setErrors(_errors)};      
        try {
            const data = {
                username,
                password
            };

            const res = await HttpClient().post('/api/v1/user/login',data);
            const {user,token} = res.data;
            setUser(user);
            localStorage.setItem('token',token);
            // history.push('/');
        } catch (error) {
            const message = error.response.data.message;
            setErrors([message])
        }
    }

    return ( 
            <div className= "page">
            <h1 className = "page-title">Log In</h1>
            
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="username" className= "form_label">username: </label>
                <input type="text"
                    required 
                    className = "form_input"
                    value={username}
                    onChange={e =>{setUsername(e.target.value)}}/>
                 
                <label htmlFor="password" className= "form_label">password: </label>
                <input type="password"
                    required 
                    className = "form_input"
                    value={password}
                    onChange={e =>{setPassword(e.target.value)}}/>
                {!!errors.length &&  <FormErrors errors ={errors[0]} />}   
                     
                
                <Button type= "submit">Log In</Button>
            </form>
        </div>

         
        

     );
}
 
export default Login;