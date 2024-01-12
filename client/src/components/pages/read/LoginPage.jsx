import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/LoginContext";

function LoginPage() {
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { loggedIn, login } = useContext(AuthContext);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(loggedIn) {
            navigate("/blog");
        } else {
            login(username, password)
                .then(data => {
                    if(data.success) {
                        console.log("Login successful");
                        navigate("/blog");
                    } else {
                        setData(data);
                    }
                });
        }
    }

    return(
        <div>
            <h1>User Login</h1>
            {data.success === false ? <p>Login failed</p> : null}
            <form action="/blog/poster/login" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" onChange={handleUsernameChange} value={username} />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;