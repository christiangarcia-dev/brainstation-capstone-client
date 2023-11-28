import "./TranslatePage.scss";
import TranslationForm from "../../components/TranslationForm.js/TranslationForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from '../../components/auth/auth';
import NavSidebar from "../../components/NavSidebar/NavSidebar";



function TranslatePage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); 
    };

    return(
        <body>
            <header>
                <NavSidebar />
            </header>
            <TranslationForm />
        </body>
    )
}

export default TranslatePage;