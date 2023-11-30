import "./SidePanel.scss";
import { NavLink } from "react-router-dom";
import exitIcon from "../../assets/icons/exit.svg";

function SidePanel({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="side-panel">
            <img className="side-panel__close" onClick={onClose} src={exitIcon} alt="Close"></img>
            <div className="side-panel__group">
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/translate">Translate</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/transcribe">Transcribe</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/saved">Archived</NavLink>
                <NavLink className="side-panel__link" activeClassName="side-panel__active" to="/">Logout</NavLink>
            </div>
        </div>
    );
}

export default SidePanel;
