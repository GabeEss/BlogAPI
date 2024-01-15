import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import custom from '../../../../axios-custom';

function EditPostPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [errorDisplay, setErrorDisplay] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { title, text };
        try {
            const response = await custom.post(`/blog/post/${id}/update`, data);
            if(response.data.success) {
                console.log("Post update successful.");
                navigate(`/blog/post/${response.data.post._id}`);
            }
        } catch(error) {
            console.error(`An error occured: ${error}`);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrorDisplay(error.response.data.errors);
            } else {
                setErrorDisplay(error.message);
            }
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id='title'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea
                        id='text'
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {errorDisplay && errorDisplay.length > 0 ? (
                <>
                    <h3>Errors</h3>
                    {errorDisplay.map((error, index) => (
                        <div key={index}>
                            <p>{error.msg}</p>
                        </div>
                    ))}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default EditPostPage;