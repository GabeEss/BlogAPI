import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostListPage() {
    const [data, setData] = useState({});
    
    useEffect(() => {
        axios.get('/blog/posts')
        .then(response => { 
            setData(response.data);
        })
        .catch(error => console.error(error));
    }, []);
    
    return (
        <div>
        <h1>{data.title}</h1>
        {data.c_user && <p>User: {data.c_user}</p>}
        {data.post_list && data.post_list.map ((post, index) => (
            <div key={index}>
                <h2><Link to={post.url}>{post.title}</Link></h2>
                <p>{post.text}</p>
            </div>
        ))}
        </div>
    );
}

export default PostListPage;