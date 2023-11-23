import { auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"; 
import { useState } from "react";

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);   
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);   
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} type="email"></input>
            <input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password"></input>
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={logout}>Log out</button>
        </div>
    )
}