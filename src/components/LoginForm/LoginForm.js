import "./LoginForm.scss";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/translate');
        } catch (error) {
            console.error(error);
            alert("Login failed: " + error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        await handleLogin();
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-form__label" htmlFor="email">Email</label>
            <input className="login-form__input" id="email" placeholder="Enter your Email here" type="email" onChange={(e) => setEmail(e.target.value)} />

            <label className="login-form__label" htmlFor="password">Password</label>
            <input className="login-form__input" id="password" placeholder="Enter your Password here" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button className="login-form__button" onClick={handleLogin} type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
