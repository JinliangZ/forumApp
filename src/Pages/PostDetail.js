import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';
import moment from 'moment';
import AddComment from '../Components/AddComment';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const PostDetail = () => {
    const {id} = useParams(); 
    const [detail, setDetail] = useState([]);
    const [comments, setComments] = useState([])
    const [when, setWhen] = useState([]);   
     

    useEffect(() => {
        postDetail();  
        showComments();     
    }, []);


    const postDetail = async ()=>{
        
        const repsonse = await HttpClient().get(`/api/v1/posts/posts-detail/${id}`);
        const data = repsonse.data;        
        setDetail(data);     
        const time  = moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss');
        const when = moment(time).fromNow();
        setWhen(when);    

    };

    const showComments = async ()=>{
        const response = await HttpClient().get(`/api/v1/comments/show-comments/${id}`);
        setComments(response.data);
    };

    

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            marginTop: theme.spacing(2),
          },
        },
      }));

   

    return ( 
        
        <div className= "post_detail">
        
            <h1 className = "navbar_submenu-link">{detail.title}</h1>
            <p  className ="post_detail_content">{detail.content}</p>
            <div className="post_tag">
                <span  className ="post_detail_content">{detail.username}</span>
                <span  className ="post_detail_content">{when}</span>
            </div>
            <div className = "post_comments">
                {comments.map((comment,index) =>{
                    return(
                       <div key ={index} className ="comments">
                            <hr></hr>
                            <h6 className ="post_detail_content">Reply : {comment.comment}</h6>
                            <p className ="post_detail_content">by {comment.username}</p>                       
                        </div> 

                    )
                })}
            </div>
            
            <AddComment postId= {id}/>

            <div className={useStyles().root}>                
                <Pagination count={8} variant="outlined" shape="rounded" />
            </div>
            
           
        </div>
     );
}
 
export default PostDetail;