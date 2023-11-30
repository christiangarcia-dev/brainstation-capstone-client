import "./TranscribePage.scss";
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import FileUploadForm from "../../components/FileUploadForm/FileUploadForm"; 

function TranscribePage() {

    return(
        <>
            <header>
                <NavSidebar />
            </header>    
            <main>
                <FileUploadForm />
            </main>
        </>
    )
}

export default TranscribePage;