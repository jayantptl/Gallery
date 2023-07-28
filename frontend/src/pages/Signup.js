import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const contObj = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signup = async () => {
            setIsLoading(true);
            setError(null);

            const response = await fetch('https://gallery-dh9v.onrender.com/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            // server return a token 
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
        await signup();
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
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
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error"> {error} </div>}

        </form>
    )
}

export default Signup;
