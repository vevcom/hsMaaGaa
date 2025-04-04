"use client"
import React, { useEffect, useState } from "react";
import styles from "./background.module.css"

function getWindowDimensions() {
    const {innerWidth: width,innerHeight: height} = window;
    return {
        width,height
    };
}

export default function Background() {
    const boxHeight = 50;
    const boxWidth = 100;
    const [x,setX] = React.useState(0);
    const [y,setY] = React.useState(0);

    useEffect (() => {
        let animationFrameId:number;
        let direction:number = Math.random()*Math.PI;
        let windowDimensions = getWindowDimensions();
        let currentX:number = Math.floor((getWindowDimensions().width-boxWidth)*Math.random());
        let currentY:number = Math.floor((getWindowDimensions().height-boxHeight)*Math.random());
        function handleResize() {
            windowDimensions = getWindowDimensions();
        }
        
        const render = () => {
            if (currentX+boxWidth > windowDimensions.width) {
                direction = Math.PI-direction;
                currentX = windowDimensions.width-boxWidth;
            }
            if (currentX < 0) {
                direction = Math.PI-direction;
                currentX = 0;
            }
            if(currentY+boxHeight > windowDimensions.height) {
                direction = -direction;
                currentY = windowDimensions.height-boxHeight;
            }
            if(currentY < 0) {
                direction = -direction;
                currentY = 0;
            }
            // if (currentX < 0) {direction = 1}
            currentX += Math.cos(direction);
            currentY += Math.sin(direction);
            setX(currentX);
            setY(currentY);
            animationFrameId = requestAnimationFrame(render);
        }
        window.addEventListener('resize',handleResize);
        render();
        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize',handleResize);
        };
    }, []);
    
    const timeDelay = Math.floor(-Math.random()*10)

    return (
        <><div style={{
            position: "absolute", 
            left: x + "px",
            top: y + "px",
            textWrap: "nowrap",
            width: boxWidth,
            height: boxHeight
        }} className={styles.hsMaGaText}>
            <div className={styles.flexContainer}>
                <span>HS må gå</span>
            </div>
        </div>
        </>
    )
}