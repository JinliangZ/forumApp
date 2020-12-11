import React, { Component , useEffect, useState} from 'react';
import HttpClient from '../Services/HttpClient';
import moment from 'moment';
import { useHistory} from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';

const ManagePost = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const {user} = useContext(AppContext);
    
  
    useEffect(() => {
      getPosts();    
    }, []);
  
      
    const getPosts = async ()=>{
      
        const res = await HttpClient().get('/api/v1/posts/manage_posts');
        const posts = res.data;
        setPosts(posts);
        };

    const deletPosts = async ()=>{
        const postId =document.querySelector('a.delete')
        const res = await HttpClient().delete(`/api/v1/posts/delete_posts/${postId.dataset.id}`);  
        setPosts(posts);
        window.location.reload();
    };
    
    return ( 
        <div className= "page">
          <h1 className = "page-title home"> PERSONAL POSTS   </h1> 
          {posts.length > 0 &&
                    
            posts.map((post,index)=>{
                
                const time  = moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss');
                const when = moment(time).fromNow();
                return (
                    <div key={index} className= "user_post">
                        <div>
                            <h3 className = "navbar_submenu-link" onClick={()=>{history.push(`/posts-detail/${post._id}`)}}>{post.title}</h3>
                            <div className ="post_content">{post.content}</div>
                                {/* <p>{index}</p> */}
                                <div className="post_tag">
                                    <span>by {post.username}</span>
                                    <span> {when}</span>
                                </div>
                        </div>
                        <div className = 'delete_post'>
                            <a className ="delete" data-id= {post._id}><img src="/trashcan.svg" alt="delet_post" onClick={deletPosts}/></a>
                        </div>
                    </div>
                
                )
                })
                }       
        </div>
     );
}
 
export default ManagePost;