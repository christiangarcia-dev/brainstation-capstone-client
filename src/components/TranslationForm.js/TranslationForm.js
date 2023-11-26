// components/TranslationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function TranslationForm() {
    const [inputText, setInputText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Spanish'); // Default language
    const [translatedText, setTranslatedText] = useState('');

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setTargetLanguage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/chatgpt/translate', {
                text: inputText,
                targetLanguage: targetLanguage,
            });
            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
            // Handle errors appropriately
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea value={inputText} onChange={handleTextChange} placeholder="Enter text to translate" />
                <select value={targetLanguage} onChange={handleLanguageChange}>
                    {/* Add more languages as needed */}
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                </select>
                <button type="submit">Translate</button>
            </form>
            {translatedText && (
                <div>
                    <h3>Translated Text:</h3>
                    <p>{translatedText}</p>
                </div>
            )}
        </div>
    );
}

export default TranslationForm;
