import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';
import moment from 'moment';



const PostDetail = () => {
    const {id} = useParams(); 
    const [detail, setDetail] = useState([]);
    const [when, setWhen] = useState([]);
     

    useEffect(() => {
        postDetail();       
    }, []);

    
    


    const postDetail = async ()=>{
        
        const repsonse = await HttpClient().get(`/api/v1/posts/posts-detail/${id}`);
        const data = repsonse.data;        
        setDetail(data);     
        const time  = moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss');
        const when = moment(time).fromNow();
        setWhen(when);    

    }

    return ( 
        
        <div className= "post_detail">
        
            <h1 className = "navbar_submenu-link">{detail.title}</h1>
            <p  className ="post_detail_content">{detail.content}</p>
            <div className="post_tag">
                <span  className ="post_detail_content">{detail.username}</span>
                <span  className ="post_detail_content">{when}</span>
            </div>
        </div>
     );
}
 
export default PostDetail;