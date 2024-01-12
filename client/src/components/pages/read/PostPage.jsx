import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PostPage() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() =>{
        axios.get(`/blog/post/${id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            <h1>{data.title}</h1>
            {data.c_user && <p>User: {data.c_user}</p>}
            {data.post && (
                <div>
                    <h2>{data.post.title}</h2>
                    <p>{data.post.text}</p>
                    <div>
                        <h3>Comments</h3>
                        {data.post_comments && data.post_comments.map((comment, index) => (
                            <div key={index}>
                                <p><Link to={`/blog/comment/${comment._id}`}>{comment.text}</Link></p>
                                <p>Written by: {comment.owner}</p>
                                <p>Created at: {comment.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPage;