import "./TranslatePage.scss";
import FileUploadForm from "../../components/fileUploadForm/fileUploadForm";
import TranslationForm from "../../components/TranslationForm.js/TranslationForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from '../../components/auth/auth';


function TranslatePage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); 
    };

    return(
        <>
            <FileUploadForm />
            <TranslationForm />
            <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default TranslatePage;