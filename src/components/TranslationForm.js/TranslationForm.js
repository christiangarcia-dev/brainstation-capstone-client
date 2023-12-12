// components/TranslationForm.js
import "./TranslationForm.scss";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import caretIcon from "../../assets/icons/caret.svg";
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
    const [isMicHovered, setIsMicHovered] = useState(false);
    const [isStopHovered, setIsStopHovered] = useState(false);

    const handleLanguageChange = (language) => {
        setTargetLanguage(language);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
        setTranslatedText('');
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => {
            if (event.target.value.trim() !== '') {
                translateText(event.target.value.trim());
            }
        }, 2000)); 
    };

    const handleClearText = () => {
        setInputText(''); 
        setTranslatedText(''); 
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
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob([audioRef.current], { type: 'audio/wav' });
                const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                await sendAudioToBackend(audioFile);
            };
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToBackend = async (audioFile) => {
        const formData = new FormData();
        formData.append('file', audioFile);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/whisper/transcribe`, formData, {
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
    };
    

    const translateText = async (text) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chatgpt/translate`, {
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
            alert('Translation and transcription saved');
        } catch (error) {
            console.error('Error saving translation:', error);
        }
    };

    const handleTTS = async (text) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tts/createspeech`, { text });
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

    useEffect(() => {
        if (inputText.trim() === '') {
            setTranslatedText('');
        }
    }, [inputText]);

    return (
        <section className='translate-container'>
            <section className='translate'>
                <article className='translate__input'>
                    <textarea className='translate__input--value' value={inputText} onChange={handleTextChange} placeholder="Type or speak to translate..." />
                    <img className="translate__input--icon" src={playIcon} onClick={() => handleTTS(inputText)}></img>
                </article>
                <img className="translate__clear--icon1" src={clearIcon} onClick={handleClearText}></img>
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
                        <div className="controls__group--clear-container"><img className="translate__clear--icon2" src={clearIcon} onClick={handleClearText}></img></div>
                        <div className="controls__stop" onClick={stopRecording} onMouseEnter={() => setIsStopHovered(true)} onMouseLeave={() => setIsStopHovered(false)}>
                            <div className="controls__stop--wrapper">
                                <svg className="controls__stop--icon" height="18" width="14" viewBox="0 0 384 512">
                                    <path fill={isStopHovered ? "#000000" : "#FFFFFF"} d="M320 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H320zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='controls__microphone' onClick={startRecording} onMouseEnter={() => setIsMicHovered(true)} onMouseLeave={() => setIsMicHovered(false)}>
                            <div className="controls__microphone--wrapper">
                                <svg className="controls__microphone--icon" height="18" width="14" viewBox="0 0 384 512">
                                    <path fill={isMicHovered ? "#000000" : "#FFFFFF"} d="M240 96V256c0 26.5-21.5 48-48 48s-48-21.5-48-48V96c0-26.5 21.5-48 48-48s48 21.5 48 48zM96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96S96 43 96 96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
                                </svg>
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
