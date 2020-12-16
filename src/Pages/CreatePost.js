import axios from 'axios';
import React, { Component ,useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Components/Button';
import AppContext from '../Contexts/AppContext';
import FormErrors from '../Components/FormErrors'
import HttpClient from '../Services/HttpClient';

const CreatePost = () => {
    const history =  useHistory();
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const [success, setSuccess] = useState([]);
    const {user,setUser} = useContext(AppContext);
    const username = user.username;


    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const data ={
                username,
                title,
                content
            };
            
            const res = await HttpClient().post('/api/v1/posts/create_posts',data);
            const message = res.data.message;
            setSuccess(message);
            setTitle([]);
            setContent([]);
            setTimeout(()=>{
                history.push('/home')
            },1500)
            
        } catch (error) {
            console.log(error)
        }
        

    };

    return ( 
        <div>
            <form className = "form_post"  onSubmit = {handleSubmit}>
                <FormErrors success ={success} />
                <label htmlFor="title" className="form_label">Post Title</label>
                <input type="text" 
                    required
                    className = "form_input"
                    value ={title}
                    name = "title"
                    onChange = {e =>{setTitle(e.target.value)}}
                />
                <label htmlFor="content">Post Content</label>
                <textarea 
                    required
                    name="content" 
                    id="content" 
                    value = {content}
                    onChange = {e =>{setContent(e.target.value)}}
                >
                </textarea>
                <Button type="submit">Post</Button>
            </form>
        </div>
     );
}
 
export default CreatePost;