import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import Button from '../Components/Button';
import HttpClient from '../Services/HttpClient';
import { useHistory } from 'react-router-dom';


const AddComment = ({postId}) => {
    const {user,setUser} = useContext(AppContext);
    const username = user.username;
    const userId = user._id;
    const [comment, setComment] = useState([]);
    const history = useHistory();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data= {
            postId,
            userId,
            username,
            comment
        };
        const response = await HttpClient().post('/api/v1/comments/add-comment',data);
        setComment('');    
        history.push('/posts-detail/:id')   
        };

    return ( 
        <div>
            <form className = 'form_comment' onSubmit= {handleSubmit}>
                <label htmlFor="conmment">Comment:</label> 
                <textarea
                    className= "form_textarea" 
                    required
                    value = {comment}
                    name = "comment"
                    id = "comment"
                    cols="20" rows="20"
                    onChange ={e=>{setComment(e.target.value)}}
                />
                <Button type="submit">Commit</Button>
            </form>
    </div>
    );
}
 
export default AddComment;


