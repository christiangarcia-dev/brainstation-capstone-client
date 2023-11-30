import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TranslatePage from './pages/TranslatePage/TranslatePage';
import TranscribePage from './pages/TranscribePage/TranscribePage';
import SavedConversationsPage from './pages/SavedConversationsPage/SavedConversationsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path="/translate" element={<TranslatePage />}></Route>
        <Route path="/transcribe" element={<TranscribePage />}></Route>
        <Route path="/saved" element={<SavedConversationsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
