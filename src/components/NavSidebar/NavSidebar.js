// components/NavSidebar.js
import React, { useState } from "react";
import "./NavSidebar.scss";
import ellipsisIcon from "../../assets/icons/ellipsis.svg";
import SidePanel from "../SidePanel/SidePanel";

function NavSidebar({ onSidebarToggle }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
        onSidebarToggle && onSidebarToggle(!isPanelOpen);
    };

    return (
        <>
            <nav className={`ellipsis ${isPanelOpen ? 'hidden' : ''}`} onClick={togglePanel}>
                <img className="ellipsis__icon" src={ellipsisIcon} alt="Menu"></img>
            </nav>
            <SidePanel isOpen={isPanelOpen} onClose={togglePanel} />
        </>
    );
}

export default NavSidebar;
