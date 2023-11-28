import "./SavedConversationsPage.scss";
import { useEffect, useState } from 'react';
import { db, auth } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SavedConversationsPage() {
    const [transcriptions, setTranscriptions] = useState([]);

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

    console.log('Transcriptions State:', transcriptions); 

    return(
        <div className="saved-transcriptions">
            <h2 className="saved-transcriptions__title">Saved Transcriptions</h2>
            {transcriptions.length > 0 ? (
                <ul className="saved-transcriptions__list">
                    {transcriptions.map((transcript) => (
                        <li key={transcript.id} className="saved-transcriptions__item">
                            <div className="transcription-details">
                                <p className="transcription-details__text">{transcript.text}</p>
                                <span className="transcription-details__timestamp">{new Date(transcript.timestamp.seconds * 1000).toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="saved-transcriptions__message">No transcriptions saved yet.</p>
            )}
        </div>
    )
}

export default SavedConversationsPage;
