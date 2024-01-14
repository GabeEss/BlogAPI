import {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import { AuthContext } from '../../../contexts/LoginContext';
import axios from 'axios';

function CommentPage() {
    const [data, setData] = useState({});
    const {id} = useParams();
    const { loggedIn } = useContext(AuthContext);

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
            <div>
                {loggedIn ? (
                    <div>
                        <button><Link to={`/blog/comment/${id}/delete`}>Delete this comment...</Link></button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default CommentPage;