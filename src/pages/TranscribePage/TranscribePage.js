import "./TranscribePage.scss";
import { useState } from "react";
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import FileUploadForm from "../../components/FileUploadForm/FileUploadForm"; 

function TranscribePage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
        <>
            <header>
                <NavSidebar onSidebarToggle={setIsSidebarOpen} />
            </header>    
            <main>
                <FileUploadForm isSidebarOpen={isSidebarOpen} />
            </main>
        </>
    )
}

export default TranscribePage;