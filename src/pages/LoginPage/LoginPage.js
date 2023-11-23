import "./LoginPage.scss";
import { Auth } from "../../components/auth/auth";
import { db, auth, storage } from '../../config/firebase';
import { useEffect } from 'react';
import { getDocs, getDoc, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { async } from '@firebase/util';
import { useState } from 'react';

function LoginPage() {

    const [transcripts, setTranscripts] = useState([]);

    // states for saving a new conversation 

    const transcriptsCollectionRef = collection(db, "transcripts");

    useEffect(() => {
        const getTranscripts = async () => {
        // READ THE DATA FROM THE DB 
        // SET THE TRANSCRIPT CONTENT 
        try {
            const data = await getDocs(transcriptsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            }));
            setTranscripts(filteredData);
            console.log(filteredData)
        } catch (error) {
            console.error(error);
        }
        }
        getTranscripts();
    }, []);

    return(
        <>
            <Auth />
        </>
    )
}

export default LoginPage;