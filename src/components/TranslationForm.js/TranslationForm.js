// components/TranslationForm.js
import "./TranslationForm.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import caretIcon from "../../assets/icons/caret.svg";
import micIcon from "../../assets/icons/microphone.svg";
import TargetLanguageModal from "../TargetLanguageModal/TargetLanguageModal";

function TranslationForm() {
    const [inputText, setInputText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Spanish'); 
    const [translatedText, setTranslatedText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                </article>
                <article className='translate__output'>
                    <p className='translate__output--value'>{translatedText}</p>
                </article>
            </section>

            <section className='controls'>
                <div className='controls__target-language' onClick={toggleModal}>
                    <p className='controls__target-language--subtitle'>Translate to</p>
                    <p className='controls__target-language--value'>{targetLanguage} <img className='controls__target-language--icon' src={caretIcon}></img></p>
                </div>
                <div className='controls__microphone'> 
                    <img className='controls__microphone--icon' src={micIcon}></img> 
                </div>
            </section>

            <button className='save-button'>Save</button>

            <TargetLanguageModal 
                isOpen={isModalOpen} 
                onSelectLanguage={handleLanguageChange} 
                onClose={toggleModal}
            />
        </section>
    );
}

export default TranslationForm;
