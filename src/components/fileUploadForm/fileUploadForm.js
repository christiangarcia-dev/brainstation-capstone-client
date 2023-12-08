import "./FileUploadForm.scss";
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import closeModalIcon from "../../assets/icons/close-black.svg";

function FileUploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (transcription) setIsModalOpen(false);
    }, [transcription]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTranscription(''); 

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
            setTranscription(response.data.text || 'Transcription not available');
        } catch (error) {
            console.error('Error uploading file:', error);
            setTranscription('Error in transcription');
        }
    };

    const saveTranscriptionToFirestore = async (transcription) => {
        if (auth.currentUser) {
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
        } else {
            console.log('User not logged in');
        }
    };
    

    const handleSaveTranscription = () => {
        if (transcription) {
            saveTranscriptionToFirestore(transcription);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    
    return (
        // <div className="file-upload">
        //     {isModalOpen && (
        //         <div className="file-upload__modal">
        //             <div className="file-upload__modal__content">
        //                 <img className="file-upload__modal__close" src={closeModalIcon} onClick={handleCloseModal} alt="Close modal"></img>
        //                 <h2 className="file-upload__modal__header">Upload an Audio File</h2>
        //                 <p className="file-upload__modal__supported">Supported file types: </p>
        //                 <p className="file-upload__modal__supported--values">mp3, mp4, mpeg, mpga, m4a, wav, and webm</p>
        //                 <div className="file-upload__modal__buttons">
        //                     <input type="file" onChange={handleFileChange} className="file-upload__modal__input" />
        //                     <button className="file-upload__modal__upload" onClick={handleSubmit} disabled={!selectedFile}>Upload</button>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        //     {transcription && (
        //         <div className="file-upload__result">
        //             <h3 className="file-upload__result--header">Transcription:</h3>
        //             <p className="file-upload__result--value">{transcription}</p>
        //             <div className="file-upload__result--buttons">
        //                 <button className="file-upload__result--save" onClick={handleSaveTranscription}>Save Transcription</button>
        //                 <button className="file-upload__result--new" onClick={openModal}>Transcribe New File</button>
        //             </div>
        //         </div>
        //     )}
        // </div>
        
        <section className="upload">
            <div className="upload__header">
                <img className="upload__header--icon"></img>
                <h2 className="upload__header--text">Upload your file</h2>
            </div>
            <article className="upload__drag">
                <h3 className="upload__drag--header">Drag & Drop</h3>
                <p className="upload__drag--supported">Supported format files</p>
                <p className="upload__drag--filetypes">mp3, mp4, mpeg, mpga, m4a, wav, and webm</p>
                <img className="upload__drag--icon"></img>
                <button className="upload__drag--file-btn">Choose File</button>
            </article>
        </section>
    
    );
}

export default FileUploadForm;