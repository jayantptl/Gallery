import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    // eamil and password that will be sent to server
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const contObj = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const login = async () => {
            setIsLoading(true);
            setError(null);

            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            // server return a token if user is valid else error
            console.log('Authstate ', json);
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }
            if (response.ok) {
                // save the user (jwt) in local storage
                localStorage.setItem('user', JSON.stringify(json));   // storing both email and token into local storage

                // update user state
                contObj.setUser(json);
                setIsLoading(false);
            }
        }
        await login();
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login </h3>
            <label>Email :</label>
            <input
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
            />

            <label>Password :</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default Login;