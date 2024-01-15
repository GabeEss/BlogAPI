import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import custom from '../../../../axios-custom';

function PostListPage() {
    const [data, setData] = useState({});
    
    useEffect(() => {
        custom.get('/blog/posts')
        .then(response => { 
            setData(response.data);
        })
        .catch(error => console.error(error));
    }, []);
    
    return (
        <div>
        <h1>{data.title}</h1>
        {data.post_list ? (
            data.post_list.map ((post, index) => (
                <div key={index}>
                    <h2><Link to={`/blog/post/${post._id}`}>{post.title}</Link></h2>
                    <p>{post.text}</p>
                </div>
            ))) : (
            <p>No posts available.</p>
        )}
        </div>
    );
}

export default PostListPage;