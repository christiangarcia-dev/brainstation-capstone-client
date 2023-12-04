import './Auth.scss';
import { auth, googleProvider, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const logout = async (navigate) => {
    try {
        await signOut(auth);
        alert("You have been logged out.");
        navigate('/'); 
    } catch (error) {
        console.error(error);
        alert("Logout failed: " + error.message);
    }
};

export const signInWithGoogle = async (navigate) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                firstName: user.displayName.split(" ")[0],
                lastName: user.displayName.split(" ")[1] || "",
                email: user.email
            });
            console.log("New Google user saved in Firestore");
        } else {
            console.log("Existing Google user found in Firestore");
        }

        navigate('/translate');
    } catch (error) {
        console.error(error);
        alert("Google sign-in failed: " + error.message);
    }
};



export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate("/translate");
            } else {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const signUp = async () => {
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

    const signInWithEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("You have signed in.");
            navigate('/translate');
        } catch (error) {
            console.error(error);
            alert("Sign in failed: " + error.message);
        }
    };
    

    return (
        <div className="auth">
            <div className="auth__signup">
                <input className="auth__input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <input className="auth__input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <input className="auth__input" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <input className="auth__input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="auth__button" onClick={signUp}>Sign Up</button>
            </div>
            <div className="auth__signin">
                <input className="auth__input" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <input className="auth__input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="auth__button" onClick={() => signInWithEmail()}>Sign In</button>
                <button className="auth__button auth__button--google" onClick={() => signInWithGoogle(navigate)}>Sign in with Google</button>
            </div>
            <button className="auth__button" onClick={() => logout(navigate)}>Log out</button>
        </div>
    );
}
