import "./SavedConversationsPage.scss";
import { useEffect, useState } from 'react';
import { db, auth } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SavedConversationsPage() {
    
    const [transcriptions, setTranscriptions] = useState([]);

    useEffect(() => {
        const fetchTranscriptions = async () => {
            if (auth.currentUser) {
                const transQuery = query(collection(db, 'transcriptions'), where('userId', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(transQuery);
                const fetchedTranscriptions = querySnapshot.docs.map(doc => doc.data());
                setTranscriptions(fetchedTranscriptions);
            }
        };

        fetchTranscriptions();
    }, []);
    
    return(
        <></>
    )
}

export default SavedConversationsPage;