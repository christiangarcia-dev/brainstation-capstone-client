import "./SavedConversationsPage.scss";
import { useEffect, useState } from 'react';
import axios from "axios";
import { db, auth } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import arrowsIcon from "../../assets/icons/arrows.svg";

function SavedConversationsPage() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [translations, setTranslations] = useState([]);

    useEffect(() => {
        const fetchTranscriptions = async () => {
            if (auth.currentUser) {
                try {
                    const transQuery = query(collection(db, 'transcriptions'), where('userId', '==', auth.currentUser.uid));
                    const querySnapshot = await getDocs(transQuery);
                    const fetchedTranscriptions = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    console.log('Fetched Transcriptions:', fetchedTranscriptions); 
                    setTranscriptions(fetchedTranscriptions);
                } catch (error) {
                    console.error('Error fetching transcriptions:', error);
                }
            }
        };

        fetchTranscriptions();
    }, []);

    useEffect(() => {
        const fetchTranslations = async () => {
            if (auth.currentUser) {
                try {
                    const transQuery = query(collection(db, 'translations'), where('userId', '==', auth.currentUser.uid));
                    const querySnapshot = await getDocs(transQuery);
                    const fetchedTranslations = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    console.log('Fetched Translations:', fetchedTranslations); 
                    setTranslations(fetchedTranslations);
                } catch (error) {
                    console.error('Error fetching translations:', error);
                }
            }
        };

        fetchTranslations();
    }, []);

    const handleTTS = async (text) => {
        try {
            const response = await axios.post('http://localhost:8080/api/tts/createspeech', { text });
            const audioUrl = response.data.audio_url;
    
            const audio = new Audio(audioUrl);
            audio.oncanplaythrough = () => audio.play(); 
            audio.onerror = () => console.error("Error playing audio");
        } catch (error) {
            console.error('Error with TTS:', error);
        }
    };
    

    return(
        <>
            <header>
                <NavSidebar />
            </header>
            <main className="">
                <div className="saved-translations">
                    <h2 className="saved-translations__title">Saved Translations</h2>
                    {translations.length > 0 ? (
                        <ul className="saved-translations__list">
                            {translations.map((translation) => (
                                <li key={translation.id} className="saved-translations__item">
                                    <div className="translation-details">
                                        <p onClick={() => handleTTS(translation.originalText)} className="translation-details__original-text">{translation.originalText}</p>
                                        <img  className="translation-details__arrows-icon" src={arrowsIcon}></img>
                                        <p onClick={() => handleTTS(translation.translatedText)} className="translation-details__translated-text">{translation.translatedText}</p>
                                        <span className="translation-details__timestamp">{new Date(translation.timestamp.seconds * 1000).toLocaleString()}</span>
                                        <p className="translation-details__target-language">{translation.targetLanguage}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="saved-translations__message">No translations saved yet.</p>
                    )}
                </div>

                <div className="saved-transcriptions">
                    <h2 className="saved-transcriptions__title">Saved Transcriptions</h2>
                    {transcriptions.length > 0 ? (
                        <ul className="saved-transcriptions__list">
                            {transcriptions.map((transcript) => (
                                <li key={transcript.id} className="saved-transcriptions__item">
                                    <div className="transcription-details">
                                    <p onClick={() => handleTTS(transcript.text)} className="transcription-details__text">{transcript.text}</p>
                                        <span className="transcription-details__timestamp">{new Date(transcript.timestamp.seconds * 1000).toLocaleString()}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="saved-transcriptions__message">No transcriptions saved yet.</p>
                    )}
                </div>
            </main>
        </>
    )
}

export default SavedConversationsPage;
