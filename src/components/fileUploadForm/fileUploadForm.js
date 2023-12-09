import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth, db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import closeModalIcon from "../../assets/icons/close-black.svg";
import uploadCloudIcon from "../../assets/icons/upload.svg";
import audioFileIcon from "../../assets/icons/audio-file.svg";
import "./FileUploadForm.scss";

function FileUploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        if (transcription) setIsModalOpen(false);
    }, [transcription]);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        await handleSubmit(file);
    };

    const handleSubmit = async (file) => {
        setTranscription('');

        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/whisper/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTranscription(response.data.text || 'Transcription not available');
        } catch (error) {
            console.error('Error uploading file:', error);
            setTranscription('Error in transcription');
        }
    };

    const saveTranscriptionToFirestore = async () => {
        if (!auth.currentUser || !transcription) return;

        try {
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
    };

    const handleSaveTranscription = () => saveTranscriptionToFirestore();
    const handleCloseModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true); 

    return (
        <>
            {isModalOpen && (
                <>
                    <div className="overlay"></div>
                    <section className="upload">
                        <img className="upload__close" src={closeModalIcon} onClick={handleCloseModal} alt="Close Modal" />
                        <div className="upload__header">
                            <img className="upload__header--icon" src={uploadCloudIcon} alt="Upload Icon" />
                            <h2 className="upload__header--text">Upload your file</h2>
                        </div>
                        <article className="upload__drag">
                            <h3 className="upload__drag--header">Drag & Drop</h3>
                            <p className="upload__drag--supported">Supported format files</p>
                            <p className="upload__drag--filetypes">mp3, mp4, mpeg, mpga, m4a, wav, and webm</p>
                            <img className="upload__drag--icon" src={audioFileIcon} alt="Audio File Icon" />
                            <button className="upload__drag--file-btn" onClick={handleClick}>Choose File</button>
                            <input 
                            type="file" 
                            ref={hiddenFileInput} 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                        />
                        </article>
                    </section>
                </>
            )}

            {transcription && (
                <div className="file-upload__result">
                    <h3 className="file-upload__result--header">Transcription:</h3>
                    <p className="file-upload__result--value">{transcription}</p>
                    <div className="file-upload__result--buttons">
                        <button className="file-upload__result--save" onClick={handleSaveTranscription}>Save Transcription</button>
                        <button className="file-upload__result--new" onClick={openModal}>Transcribe New File</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FileUploadForm;
