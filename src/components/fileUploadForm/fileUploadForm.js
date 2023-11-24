import "./fileUploadForm.scss";
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function FileUploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTranscription(''); // Reset transcription on new submission

        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/whisper/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Transcription:', response.data);
            // Update the transcription state with the response
            setTranscription(response.data.text || 'Transcription not available');
        } catch (error) {
            console.error('Error uploading file:', error);
            setTranscription('Error in transcription');
        }
    };

    const saveTranscriptionToFirestore = async (transcription) => {
        if (auth.currentUser) {
            try {
                // Fetch the user's details
                const userRef = doc(db, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userRef);
    
                if (!userDoc.exists()) {
                    console.log('No such user!');
                    return;
                }
    
                const userData = userDoc.data();
    
                await addDoc(collection(db, 'transcriptions'), {
                    userId: auth.currentUser.uid,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    text: transcription,
                    timestamp: new Date()
                });
    
                console.log('Transcription saved');
            } catch (error) {
                console.error('Error saving transcription:', error);
            }
        } else {
            console.log('User not logged in');
        }
    };
    

    const handleSaveTranscription = () => {
        if (transcription) {
            saveTranscriptionToFirestore(transcription);
        }
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                    <button onClick={handleSaveTranscription}>Save Transcription</button>
                </div>
            )}
            <Link to="/saved">View Transcripts</Link>
        </div>
        
    )
}

export default FileUploadForm;