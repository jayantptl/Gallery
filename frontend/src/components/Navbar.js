import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
    const { logout } = useLogout();
    const contObj = useContext(AuthContext);

    const handleClick = () => {
        logout();
    }

    return (
        <>

            <header>
                <div className="container">
                    <Link to='/'>
                        <h1>Gallery</h1>
                    </Link>
                    <nav>

                        {contObj.user && (
                            <div>
                                <span>{contObj.user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                        )}

                        {!contObj.user && (
                            <div>
                                <Link to="/login">Login </Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                    </nav>

                </div>
            </header>

        </>
    )
}

export default Navbar
