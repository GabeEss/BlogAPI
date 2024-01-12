import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function CommentPage() {
    const [data, setData] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/blog/comment/${id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            {data.comment && (
            <div>
                <h4>{data.comment.text}</h4>
                <p>Written by: {data.comment.owner}</p>
                <p>Created at: {data.comment.timestamp}</p>
            </div>
            )}
        </div>
    )
}

export default CommentPage;