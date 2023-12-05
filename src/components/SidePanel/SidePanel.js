import "./SidePanel.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import exitIcon from "../../assets/icons/exit.svg";
import { logout } from "../Auth/Auth";

function SidePanel({ isOpen, onClose }) {
    const navigate = useNavigate();
    const sidePanelRef = useRef();
    const panelClasses = isOpen ? "side-panel open" : "side-panel";

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleLogout = () => {
        logout(navigate);
        onClose(); 
    };

    return (
        <div className={panelClasses} ref={sidePanelRef}>
            <img className="side-panel__close" onClick={onClose} src={exitIcon} alt="Close"></img>
            <div className="side-panel__group">
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/translate">Translate</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/transcribe">Transcribe</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/saved">Archived</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/" onClick={handleLogout}>Logout</NavLink>
            </div>
        </div>
    );
}

export default SidePanel;
