import React, { Component , useEffect, useState} from 'react';
import HttpClient from '../Services/HttpClient';
import moment from 'moment';
import {Link, useHistory} from 'react-router-dom';


const  Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPosts();    
  }, []);

    
  const getPosts = async ()=>{
      const res = await HttpClient().get('/api/v1/posts/show_posts');
      const posts = res.data;
      setPosts(posts);
      };

    return ( 
        <div className= "page">
          <h1 className = "page-title home"> POSTS   </h1> 
          {          
            posts.map((post,index)=>{

            const time  = moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss');
            const when = moment(time).fromNow();
            return (
              <div key={index} className= "post">
                <h3 className = "navbar_submenu-link" onClick={()=>{history.push(`/posts-detail/${post._id}`)}}>{post.title}</h3>
                <div className ="post_content">{post.content}</div>
                {/* <p>{index}</p> */}
                <div className="post_tag">
                  <span>by {post.username}</span>
                  <span> {when}</span>
                </div>
              </div>
            )}
           
          )}       
        </div>
     );
}
 
export default Home;