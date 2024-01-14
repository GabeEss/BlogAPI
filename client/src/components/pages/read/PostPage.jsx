import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/LoginContext';
import axios from 'axios';

function PostPage() {
    const [data, setData] = useState({});
    const { id } = useParams();
    const { loggedIn } = useContext(AuthContext);

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
            {data.post && (
                <div>
                    <h2>{data.post.title}</h2>
                    <p>{data.post.text}</p>
                    <p>Written at: {data.post.timestamp}</p>
                    <div>
                        {data.post_comments && data.post_comments.length > 0 ? (
                            <>
                                <h3>Comments</h3>
                                {data.post_comments.map((comment, index) => (
                                    <div key={index}>
                                        <p><Link to={`/blog/comment/${comment._id}`}>{comment.text}</Link></p>
                                        <p>Written by: {comment.owner}</p>
                                        <p>Created at: {comment.timestamp}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>No comments available.</p>
                        )}
                        <p><Link to={`/blog/post/${id}/create`}>Post a comment...</Link></p>
                    </div>
                </div>
            )}
            <div>
                {loggedIn ? (
                    <div>
                        <p><Link to={`/blog/post/${id}/update`}>Update this post...</Link></p>
                        <p>Delete this post...</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default PostPage;