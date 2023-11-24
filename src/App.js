import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import TranslatePage from './pages/TranslatePage/TranslatePage';
import SavedConversationsPage from './pages/SavedConversationsPage/SavedConversationsPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path="/translate" element={<TranslatePage />}></Route>
        <Route path="/saved"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
