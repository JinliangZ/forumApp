import React, { Component ,useState } from 'react';
import FormErrors from '../Components/FormErrors';
import validator from 'validator';
import Button from '../Components/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors([]);
        let _errors = [];
        
        if(!username){ _errors.push('Username is required!')}else{_errors.push("")};
        if(!password){ _errors.push('Password is required!')}else{_errors.push("")};
        if(!passwordAgain){ _errors.push('Password is required!')}else{_errors.push("")};
        if(password !== passwordAgain){_errors.push('Passwords must match')}else{_errors.push("")};
        
        
        const data = {
            username:username,
            password:password
        };
        
        try {
            const res = await HttpClient().post('/api/v1/user/signup',data);
            setSuccess(res.data.message);
            setUsername("");
            setPassword("");
            setPasswordAgain("");
            setTimeout(() => history.push('/login') , 1500);            
        } catch (error) {
            //console.log(error.response)
            const message = error.response.data.message;
            if (message === "username_exists") {
                _errors.push('USERNAME ALREADY EXISTS!')}else{_errors.push("")};
            
        }

        if(_errors.length){setErrors(_errors)};
    }

    return ( 
            <div className= "page">
            <h1 className = "page-title">Sign Up</h1>
            
            <form onSubmit={handleSubmit}>
                <FormErrors success ={success} />
                {!!errors.length &&  <FormErrors errors ={errors[4]} />}   
                {!!errors.length &&  <FormErrors errors ={errors[3]} />}   
                <label htmlFor="username" className= "form_label">username: </label>
                <input type="text"
                    name="username"
                    className = "form_input"
                    value={username}
                    onChange={e =>{setUsername(e.target.value)}}/>
                {!!errors.length &&  <FormErrors errors ={errors[0]} />}    
                <label htmlFor="password" className= "form_label">password: </label>
                <input type="password"
                    name = "password"
                    className = "form_input"
                    value={password}
                    onChange={e =>{setPassword(e.target.value)}}/>
                {!!errors.length &&  <FormErrors errors ={errors[1]} />}   
                <label htmlFor="passwordAgain" className= "form_label">password again: </label>
                <input type="password" 
                    className = "form_input"
                    value={passwordAgain}
                    onChange={e =>{setPasswordAgain(e.target.value)}}/>
                {!!errors.length &&  <FormErrors errors ={errors[2]} />}       
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>

         
        

     );
}
 
export default Signup;