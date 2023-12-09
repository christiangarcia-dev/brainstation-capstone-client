import "./SignUpForm.scss";
import { auth, googleProvider, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google.svg";

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                firstName,
                lastName,
                email
            });
            navigate('/translate');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                firstName: user.displayName.split(" ")[0],
                lastName: user.displayName.split(" ")[1] || "",
                email: user.email
            });
            navigate('/translate');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        await handleSignUp();
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-form__label" htmlFor="firstName">First Name</label>
            <input className="signup-form__input" id="firstName" placeholder="Enter your First Name here" onChange={(e) => setFirstName(e.target.value)} />

            <label className="signup-form__label" htmlFor="lastName">Last Name</label>
            <input className="signup-form__input" id="lastName" placeholder="Enter your Last Name here" onChange={(e) => setLastName(e.target.value)} />

            <label className="signup-form__label" htmlFor="email">Email</label>
            <input className="signup-form__input" id="email" placeholder="Enter your Email here" type="email" onChange={(e) => setEmail(e.target.value)} />

            <label className="signup-form__label" htmlFor="password">Password</label>
            <input className="signup-form__input" id="password" placeholder="Enter your Password here" type="password" onChange={(e) => setPassword(e.target.value)} />

        
            <button className="signup-form__button--google" onClick={handleGoogleSignUp}><span><div className="signup-form__button--google--container"><img className="signup-form__button--google--icon" src={googleIcon}></img></div>Sign Up with Google</span></button>

            <button className="signup-form__button" onClick={handleSignUp} type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
