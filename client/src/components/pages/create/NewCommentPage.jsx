import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import custom from '../../../../axios-custom';

function NewCommentPage() {
    const [text, setText] = useState('');
    const [owner, setOwner] = useState('');
    const [errorDisplay, setErrorDisplay] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { text, owner };

        try {
            const response = await custom.post(`/blog/post/${id}/create`, data);
            if(response.data.success) {
                console.log("New comment created");
                navigate(`/blog/post/${id}`);
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrorDisplay(error.response.data.errors);
            } else {
                setErrorDisplay(error.message);
            }
        }
    }

    return(
        <div>
            <h1>New Comment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="owner">Owner</label>
                    <input
                        type="text"
                        id="owner"
                        value={owner}
                        onChange={event => setOwner(event.target.value)}
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

export default NewCommentPage;