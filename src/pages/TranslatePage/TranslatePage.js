import "./TranslatePage.scss";
import axios from 'axios';
import { useState } from "react";
import FileUploadForm from "../../components/fileUploadForm/fileUploadForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from '../../components/auth/auth';


function TranslatePage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); // Pass navigate to the logout function
    };

    return(
        <>
            <FileUploadForm />
            <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default TranslatePage;