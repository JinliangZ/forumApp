
import React, { Component , useEffect, useState} from 'react';
import HttpClient from '../Services/HttpClient'

const  Home = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getPosts();    
  }, []);

    
  const getPosts = async ()=>{
    
      const res = await HttpClient().get('/api/v1/posts/show_posts');
      console.log('send post req')
      const posts = res.data;
      setPosts(posts);
      console.log(posts)
  };
  

    return ( 
        <div className= "page">
          <h1 className = "page-title home"> POSTS   </h1> 
          {posts.map((post,index)=>{
            return (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{index}</p>
              <h5>created by {post.username}</h5>
            </div>
            )}
           
          )}       
        </div>
     );
}
 
export default Home;