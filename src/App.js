import './App.scss';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { useEffect } from 'react';
import { getDocs, getDoc, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { async } from '@firebase/util';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [transcripts, setTranscripts] = useState([]);

  // states for saving a new conversation 

  const transcriptsCollectionRef = collection(db, "transcripts");

  useEffect(() => {
    const getTranscripts = async () => {
      // READ THE DATA FROM THE DB 
      // SET THE TRANSCRIPT CONTENT 
      try {
        const data = await getDocs(transcriptsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTranscripts(filteredData);
        console.log(filteredData)
      } catch (error) {
          console.error(error);
      }
    }
    getTranscripts();
  }, []);

  return (
    <div className="App">
      <Auth />

      <div>
        {/* for this app, inputs would be user who is logged in and translations from a given seession
        IF saved */}
        <input></input>
        <input></input>
      </div>

      <div>
        {transcripts.map((transcript) => (
          <div>
            <h1>{transcript.fromUser}</h1>
            <p>{transcript.conversation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
