import "./SignUpPage.scss";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../assets/logo/echolingo-logo.svg";
import { Link } from "react-router-dom";

function SignUpPage() {

    return (
        <main className="signup-page" alt="sign-up page">
            <div className="signup-page__logo-container">
                <img className="signup-page__logo" src={Logo} alt="echolingo logo"></img>
            </div>
            <SignUpForm />
            <p className="signup-page__or">- OR -</p>
            <p className="signup-page__cta">Already have an account? <Link className="signup-page__cta--login" to="/">Login</Link></p>
        </main>
    );
}

export default SignUpPage;