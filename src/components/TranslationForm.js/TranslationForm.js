// components/TranslationForm.js
import "./TranslationForm.scss";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import caretIcon from "../../assets/icons/caret.svg";
import micIcon from "../../assets/icons/microphone.svg";
import stopIcon from "../../assets/icons/stop.svg";
import playIcon from "../../assets/icons/play.svg";
import clearIcon from "../../assets/icons/clear.svg";
import TargetLanguageModal from "../TargetLanguageModal/TargetLanguageModal";

function TranslationForm() {
    const [inputText, setInputText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Spanish'); 
    const [translatedText, setTranslatedText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const audioRef = useRef(null);

    const handleLanguageChange = (language) => {
        setTargetLanguage(language);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => {
            if (event.target.value.trim() !== '') {
                translateText(event.target.value.trim());
            }
        }, 2000)); 
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            recorder.start();
            setIsRecording(true);

            recorder.ondataavailable = (event) => {
                audioRef.current = event.data;
            };
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            sendAudioToBackend(); 
        }
    };

    const sendAudioToBackend = async () => {
        if (audioRef.current) {
            const audioBlob = new Blob([audioRef.current], { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    
            const formData = new FormData();
            formData.append('file', audioFile);
    
            try {
                const response = await axios.post('http://localhost:8080/api/whisper/transcribe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const transcription = response.data.text || 'Transcription not available';
                setInputText(transcription);
    
                if (transcription.trim() !== '') {
                    translateText(transcription.trim());
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    

    const translateText = async (text) => {
        try {
            const response = await axios.post('http://localhost:8080/api/chatgpt/translate', {
                text: text,
                targetLanguage: targetLanguage,
            });
            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    const handleSaveTranslation = async () => {
        if (!auth.currentUser) {
            console.log('User not logged in');
            return;
        }
    
        try {
            
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
    
            if (!userDoc.exists()) {
                console.log('No such user!');
                return;
            }
    
            const userData = userDoc.data();
    
            await addDoc(collection(db, 'translations'), {
                userId: auth.currentUser.uid,
                firstName: userData.firstName,
                lastName: userData.lastName,
                originalText: inputText,
                translatedText: translatedText,
                targetLanguage: targetLanguage,
                timestamp: new Date()
            });
    
            console.log('Translation saved');
        } catch (error) {
            console.error('Error saving translation:', error);
        }
    };

    const handleTTS = async (text) => {
        try {
            const response = await axios.post('http://localhost:8080/api/tts/createspeech', { text });
            const audioUrl = response.data.audio_url;
            console.log("Audio URL:", audioUrl);
    
            const audio = new Audio(audioUrl);
            audio.oncanplaythrough = () => audio.play(); 
            audio.onerror = () => console.error("Error playing audio");
        } catch (error) {
            console.error('Error with TTS:', error);
        }
    };
    

    useEffect(() => {
        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [typingTimeout]);

    return (
        <section className='translate-container'>
            <section className='translate'>
                <article className='translate__input'>
                    <textarea className='translate__input--value' value={inputText} onChange={handleTextChange} placeholder="Enter text to translate..." />
                    <img className="translate__input--icon" src={playIcon} onClick={() => handleTTS(inputText)}></img>
                </article>
                <img className="translate__clear--icon" src={clearIcon}></img>
                <article className='translate__output'>
                    <p className='translate__output--value'>{translatedText}</p>
                    <img className="translate__output--icon" src={playIcon} onClick={() => handleTTS(translatedText)}></img>
                </article>
            </section>
            <section className='controls'>
                <section className="controls__content">
                    <div className='controls__target-language' onClick={toggleModal}>
                        <p className='controls__target-language--subtitle'>Translate to</p>
                        <p className='controls__target-language--value'>{targetLanguage} <img className='controls__target-language--icon' src={caretIcon}></img></p>
                    </div>
                    <div className="controls__group">
                        <div className="controls__stop" onClick={stopRecording}>
                            <div className="controls__stop--wrapper">
                                <img className="controls__stop--icon" src={stopIcon}></img>
                            </div>
                        </div>
                        <div className='controls__microphone' onClick={startRecording}> 
                            <div className="controls__microphone--wrapper">
                                <img className='controls__microphone--icon' src={micIcon}></img> 
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <button className='save-button' onClick={handleSaveTranslation}>Save</button>

            <TargetLanguageModal 
                isOpen={isModalOpen} 
                onSelectLanguage={handleLanguageChange} 
                onClose={toggleModal}
            />
        </section>
    );
}

export default TranslationForm;
