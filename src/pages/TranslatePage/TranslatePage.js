import "./TranslatePage.scss";
import TranslationForm from "../../components/TranslationForm.js/TranslationForm";
import { useNavigate } from "react-router-dom";
// import { logout } from '../../components/Auth/Auth';
import { logout } from "../../components/auth/auth";
import NavSidebar from "../../components/NavSidebar/NavSidebar";



function TranslatePage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); 
    };

    return(
        <>
            <header>
                <NavSidebar />
            </header>
            <main>
                <TranslationForm />
            </main>
        </>
        
    )
}

export default TranslatePage;