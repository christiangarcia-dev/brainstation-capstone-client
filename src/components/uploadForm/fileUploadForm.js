import "./fileUploadForm.scss";
import axios from 'axios';
import { useState } from "react";

function FileUploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTranscription(''); // Reset transcription on new submission

        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/whisper/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Transcription:', response.data);
            // Update the transcription state with the response
            setTranscription(response.data.text || 'Transcription not available');
        } catch (error) {
            console.error('Error uploading file:', error);
            setTranscription('Error in transcription');
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
        
    )
}

export default FileUploadForm;