import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeleteCommentPage() {
    const [data, setData] = useState({});
    const [displayError, setDisplayError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/blog/comment/${id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
            setDisplayError("There was an error fetching the comment.");
        })
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/blog/comment/${id}/delete`);
            if(response.data.success) {
                console.log('Comment deleted...');
                navigate(`/blog/post/${data.comment.post._id}`);
            }
        } catch (error) {
            console.log(error);
            setDisplayError("Unforeseen error. Check the console.");
        }
    }

    return(
        <div>
            <h1>Delete Comment: {data.comment ? data.comment.text : 'Loading...'}</h1>
            <form onSubmit={handleSubmit}>
                <p>Are you sure you want to delete this comment?</p>
                <button type="submit">Yes</button>
            </form>
            <p>{displayError}</p>
        </div>
    )
}

export default DeleteCommentPage;