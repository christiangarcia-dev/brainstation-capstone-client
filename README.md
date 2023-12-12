# Project Title
EchoLingo

## Overview

EchoLingo is a cutting-edge multilingual virtual assistant designed to facilitate seamless communication and information access across multiple languages. By leveraging advanced speech-to-text and conversational AI technologies, EchoLingo aims to break down language barriers, offering users an intuitive and responsive platform for cross-lingual interactions.

### Problem

In our increasingly interconnected world, the need for effective multilingual communication tools is paramount. Traditional text-based translators or assistants often struggle with the nuances of spoken language, leading to miscommunication. EchoLingo addresses this by providing real-time, accurate voice translation and responses, enhancing understanding and engagement in diverse linguistic contexts. Moreover, EchoLingo is able to translate text documents as well as transcribe and translate voice recordings. 

### User Profile

EchoLingo targets a broad user base, including international travelers, expatriates, multilingual families, and businesses with a global clientele. Users can interact with EchoLingo to translate documents, audio recordings, their own speech, or their own text on the fly. All in their preferred language.

### Features

Transcribe: Able to convert speech recordings into properly formatted text. 
Real-Time Translation: Instant translation of spoken language into the user's chosen language by inputting their own voice, their own text, or a video / audio file with human speech. 
Speech Projection: After transcribing or translating, the users are able to listen to the content in a language of their choice. 
Multilingual Support: Support for multiple languages, with easy switching between them.

## Implementation

### Tech Stack

Frontend: React for building a dynamic, user-friendly interface.
Backend: Node.js with Express for robust server-side functionality.
Database: Firebase Firestore to simplify database operations.
Authentication: Firebase Authentication for secure user authentication and session management.
Libraries & Imports: Axios, Sass, React Router DOM, Nodemon, Cors, Dotenv, Firebase, Multer, OpenAI, Form Data. 

### APIs

Whisper API: For accurate speech-to-text conversion.
ChatGPT API: To generate intelligent and contextually appropriate text responses.
TTS API: To convert translated text to speech. 

### Sitemap

Sign In Page: Initial page upon launch for authorization and authentication. 
Sign Up Page: Page to be routed to for initial authorization and authentication. 
Translation Page: Main page where the user can input what he/she want to be translated. 
Saved Page: Final page where the user can view all of his/her saved transcriptions or translations.


### Mockups

https://www.figma.com/file/GsiVg56TIXkLaN7up4XZ3h/Christian-Garcia's-team-library?node-id=0%3A1&mode=dev

### Data

User Profiles: Basic information about users upon sign up.
Transcript Logs: Records of saved transcriptions or translations specific to the user.

### Endpoints

/api/whisper: speech-to-text (POST).
/api/chatgpt: translation (POST).
/api/tts: text-to-speech (POST).

### Auth

Using Firebase Authentication EchoLingo will implement secure authentication for user accounts. This includes login, logout, and session management, ensuring user data privacy and security.