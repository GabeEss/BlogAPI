import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import custom from "../../../../axios-custom";

function DeletePostPage() {
    const [data, setData] = useState({});
    const [displayError, setDisplayError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        custom.get(`/blog/post/${id}`)
        .then(response => { 
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
            setDisplayError("There was an error fetching the post.");
        });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await custom.post(`/blog/post/${id}/delete`);
            console.log(response);
            if(response.data.success) {
                console.log("Post deleted.");
                navigate(`/blog`);
            } else {
                setDisplayError("Cannot delete this post, while it still has comments.");
            }
        } catch (error) {
            console.log(error);
            setDisplayError("Unforeseen error. Check the console.");
        }
    }
    return(
        <div>
            <h1>Delete Post: {data.post ? data.post.title : 'Loading...'}</h1>
            <form onSubmit={handleSubmit}>
                <p>Are you sure you want to delete this post?</p>
                <button type="submit">Yes</button>
            </form>
            <p>{displayError}</p>
        </div>

    )
}

export default DeletePostPage;