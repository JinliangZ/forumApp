import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext, Component } from 'react';
import AppContext from "../Contexts/AppContext";
import axios from 'axios';
import FormErrors from "./FormErrors"
import { useHistory, Link } from 'react-router-dom';

const PasswordModal = ({children}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [errors, setErrors] = useState([]);
  const {user, setUser} = useContext(AppContext);
  const [success, setSuccess] = useState("");
  const history = useHistory();


  const handleSubmit =async (e) =>{
    e.preventDefault();
    setErrors([]);
    if(newPassword !== newPasswordAgain){setErrors(['Passwords must match'])}else{setErrors([])};
    const data = { 
      username : user.username,
      password : newPassword
    }

    try {
      const res = await axios.post('/api/v1/user/change_password',data);
      setSuccess([res.data.message]);  
      setNewPassword("");
      setNewPasswordAgain("");       
      setTimeout(() => history.push('/') , 1000);
    } catch (error) {
      const message = error.response.data.message;
      setErrors([message]);
    }
  }
  

  return (
    <>
      <Button  onClick={handleShow}>
         {children} 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit ={handleSubmit}>
            <FormErrors success ={success} />
            <label htmlFor="newPassword" className = "form_label">New Password : </label>
            <input type="password" 
              className = "form_input"
              name = "newPassword"
              value = {newPassword}
              onChange = {e=>{setNewPassword(e.target.value)}}
            />
            <label htmlFor="newPasswordAgain" className = "form_label">New Password Again: </label>
            <input type="password" 
              className = "form_input"
              name = "newPasswordAgain"
              value = {newPasswordAgain}
              onChange = {e=>{setNewPasswordAgain(e.target.value)}}
            />
            {!!errors.length &&  <FormErrors errors ={errors} />}  
            <Button type='submit'>Save Change</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>           
          <Button  onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default PasswordModal;