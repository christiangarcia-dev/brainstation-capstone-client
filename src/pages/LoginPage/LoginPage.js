import "./LoginPage.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../assets/logo/echolingo-logo.svg";
import { Link } from "react-router-dom";

function LoginPage() {

    return (
        <main className="login-page" alt="login page">
            <section className="login-page__header--container">
                <section className="login-page__header">
                    <div className="login-page__header--box"></div>
                        <div className="login-page__logo--container">
                            <img className="login-page__logo" src={Logo} alt="echolingo logo"></img>
                        </div>
                    <div className="login-page__header--box"></div>
                </section>
            </section>
            <section className="login-page__form--container">
                <LoginForm />
                <p className="login-page__or">- OR -</p>
                <p className="login-page__cta">Create an account? <Link className="login-page__cta--signup" to="/signup">Sign-Up</Link></p>
            </section>
        </main>
    );
}

export default LoginPage;