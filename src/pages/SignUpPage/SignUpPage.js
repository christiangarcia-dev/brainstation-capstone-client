import "./SignUpPage.scss";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../assets/logo/echolingo-logo.svg";
import { Link } from "react-router-dom";

function SignUpPage() {

    return (
        <main className="signup-page" alt="sign-up page">
            <section className="singup-page__header--container" id="stubborn-section">
                <section className="signup-page__header">
                    <div className="signup-page__header--box"></div>
                        <div className="signup-page__logo-container" id="stubborn-container">
                            <img className="signup-page__logo" src={Logo} alt="echolingo logo"></img>
                        </div>
                    <div className="signup-page__header--box"></div>
                </section>
            </section>
            <section className="signup-page__form--container">
                <SignUpForm />
                <p className="signup-page__or">- OR -</p>
                <p className="signup-page__cta">Already have an account? <Link className="signup-page__cta--login" to="/">Login</Link></p>
            </section>
        </main>
    );
}

export default SignUpPage;