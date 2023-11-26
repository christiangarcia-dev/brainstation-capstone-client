import "./LoginPage.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../assets/logo/echolingo-logo.png";
import { Link } from "react-router-dom";

function LoginPage() {

    return (
        <main className="login-page" alt="login page">
            <div className="login-page__logo-container">
                <img className="login-page__logo" src={Logo} alt="echolingo logo"></img>
            </div>
            <LoginForm />
            <p className="login-page__or">- OR -</p>
            <p className="login-page__cta">Create an account? <Link className="login-page__cta-signup" to="/signup">Sign-Up</Link></p>
        </main>
    );
}

export default LoginPage;