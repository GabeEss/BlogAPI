import { useEffect, useState } from "react";

function LoginPage() {
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch("/blog/poster/login")
        .then(response => response.json())
        .then(data => setData(data));
    }, []);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return(
        <div>
            <h1>{data.title}</h1>
            {data.c_user && <p>User: {data.c_user}</p>}
            <form action="/blog/poster/login" method="POST">
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