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
                    console.log('Fetched Transcriptions:', fetchedTranscriptions); // Debugging
                    setTranscriptions(fetchedTranscriptions);
                } catch (error) {
                    console.error('Error fetching transcriptions:', error);
                }
            }
        };

        fetchTranscriptions();
    }, []);

    console.log('Transcriptions State:', transcriptions); // Debugging

    return(
        <div className="saved-transcriptions">
            <h2>Saved Transcriptions</h2>
            {transcriptions.length > 0 ? (
                <ul>
                    {transcriptions.map((transcript) => (
                        <li key={transcript.id}>
                            <div className="transcription-details">
                                <p className="transcription-text">{transcript.text}</p>
                                <span className="transcription-timestamp">{new Date(transcript.timestamp.seconds * 1000).toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transcriptions saved yet.</p>
            )}
        </div>
    )
}

export default SavedConversationsPage;
