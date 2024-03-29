import React, { useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useDrag } from "@use-gesture/react";
import Icon from "./Icon";

import recycleBin from '../assets/recycle.png'
import fileIcon from '../assets/file.png'

function RecycleModal() {
    const {recycleRef, pages, setPages, selected, setSelected } = useContext(GlobalContext);
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
    const bindWindowPos = useDrag((params) => {
        setWindowPosition({
          x: params.offset[0],
          y: params.offset[1],
        });
      });
    const miniDown = (e) => {
    e.stopPropagation();
    };    

    const handleClick = () => {
      setSelected("Recycle Bin")
    }

    const handleClose = () => {
        setPages(pages.filter(page => page !== 'Recycle Bin'))
    }

    const handleMinimize = () => {
        recycleRef.current.style.display = 'none'
        setSelected("")
    }

    const handleFullscreen = () => {
      recycleRef.current.classList.toggle("fullscreen")
    }

    const handleIconClick = (e, name) => {
        e.stopPropagation();
        if (!pages.includes(name)) {
          setPages([...pages, name]);
          setSelected(name);
        } else {
          setSelected(name);
        }
      };

    return (
        <div 
            onPointerDown={handleClick}
            style={{
                display: pages.includes("Recycle Bin") ? "flex": "none",
                left: windowPosition.x,
                top: windowPosition.y
            }}
            ref={recycleRef}
            className={selected === "Recycle Bin" ? "RecycleBin top" : "RecycleBin"}
            id='recycle-modal'
        >
                <div className="modal-header" {...bindWindowPos()} >
                    <div className="header-left">
                        <img src={recycleBin} alt="" />
                        <h2>Recycle Bin</h2>
                    </div>
                    <div className="header-right">
                        <button onClick={handleMinimize} onPointerDown={(e) => miniDown(e)}>_</button>
                        <button onClick={handleFullscreen}>O</button>
                        <button  className="close-modal" onClick={handleClose}>
                            X
                        </button>
                    </div>
                    
                </div>
                <div className="window-body">
                    <Icon 
                        name="OldResume.jpg"
                        image={fileIcon}
                        handleClick={(e) => handleIconClick(e, "OldResume")}
                        alt="Old Resume Picture"
                    />
                </div>
        </div>
    );
}

export default RecycleModal;
