import "./TargetLanguageModal.scss";

function TargetLanguageModal({ isOpen, onSelectLanguage, onClose }) {
    const languages = [
        "Afrikaans", "Arabic", "Armenian", "Azerbaijani", "Belarusian", "Bosnian", 
        "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", 
        "English", "Estonian", "Finnish", "French", "Galician", "German", "Greek", 
        "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Italian", "Japanese", 
        "Kannada", "Kazakh", "Korean", "Latvian", "Lithuanian", "Macedonian", "Malay", 
        "Marathi", "Maori", "Nepali", "Norwegian", "Persian", "Polish", "Portuguese", 
        "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", 
        "Swedish", "Tagalog", "Tamil", "Thai", "Turkish", "Ukrainian", "Urdu", 
        "Vietnamese", "Welsh"
    ];

    const handleLanguageSelect = (language) => {
        onSelectLanguage(language);
        onClose();
    };

    const handleOverlayClose = () => {
        onClose();
    }

    return isOpen ? (
        <div className="target-language-modal" onClick={handleOverlayClose}>
            <div className="target-language-modal__content">
                <ul className="target-language-modal__list">
                    {languages.map((language) => (
                        <li 
                            key={language} 
                            className="target-language-modal__item"
                            onClick={() => handleLanguageSelect(language)}
                        >
                            {language}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : null;
}

export default TargetLanguageModal;
