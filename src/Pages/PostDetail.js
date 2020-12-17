import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';
import moment from 'moment';
import AddComment from '../Components/AddComment';
import PaginationRounded from '../Components/Pagination';
import PostRating from '../Components/Rating';



const PostDetail = () => {
    const {id} = useParams(); 
    const [detail, setDetail] = useState([]);
    const [comments, setComments] = useState([])
    const [when, setWhen] = useState([]);   
    const [avgStars, setAvgStars] = useState(0);   
    const [currentPage, setCurrentPage] = useState(1);   
    

     

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
        //console.log(response.data)
        const data = response.data;
        setComments(data);

        const stars = data.map((data) => {
            return data.value
        });
        const reducer = (accumulator, currentValue)=>{
           return accumulator + currentValue;
        };
        setAvgStars(Math.ceil(stars.reduce(reducer,0)/(data.length)));    
    };  


    const postPerPage = 5;
    const pages = Math.ceil(comments.length/postPerPage);
    return ( 
        
        <div className= "post_detail">
        
            <h1 className = "navbar_submenu-link">{detail.title}</h1>
            <div className = "comment-rating">
                <PostRating name="read-only" value ={avgStars} readOnly={true}/> 
            </div>
                                      
            <p  className ="post_detail_content">{detail.content}</p>
            <div className="post_tag">
                <span  className ="post_detail_content">{detail.username}</span>
                <span  className ="post_detail_content">{when}</span>
            </div>
            <div className = "post_comments">
                {comments.map((comment,index) =>{
                    if(index >= ((currentPage-1)*postPerPage) && index < (currentPage*postPerPage)){
                        return(
                       <div key ={index} className ="comments">
                            <hr></hr>
                            <h6 className ="post_detail_content">Reply : {comment.comment}</h6>
                            <p className ="post_detail_content">by {comment.username}</p>
                            <div className = "comment-rating">
                                <PostRating name="read-only" value ={comment.value} readOnly={true}/> 
                            </div>                                                                              
                        </div> 
                    )
                    }                
                })}
            </div>
            
            <PaginationRounded pages={pages} setCurrentPage={setCurrentPage}/>
            <AddComment postId= {id}/>       
            
           
        </div>
     );
}
 
export default PostDetail;