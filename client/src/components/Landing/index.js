import React from 'react'
import styles from './landing.module.css'
import imagen from "../imagenes/video (1).mp4"

const index = () => {
    const backgroundImageURL = '../imagenes/tumblr_812cf4dd53d093100d7aef0a74774640_bc4f9386_400.gif';
    const containerStyle = {
        backgroundImage:
            `url(${backgroundImageURL})`,
        width: "600px",
        height: "600px",
    };
    return (
        // <div style={containerStyle}>
        //     <h1 style={{ color: "black" }}>Hi! Try edit me</h1>
        // </div>
        // <div className='vid'>

            <div className={styles.container}>
                            <video loop autoPlay muted>
                                <source src={imagen} height='200px' width='400px' type="video/mp4" />
                            </video>
                <header>
                    <div className={styles.page}>
                         {/* <h1>GAMES HENRY'S</h1> */}
                        {/* <img src={backgroundImageURL}/> */}

                        <div className={styles.texts}>
                            <h1>HenryGame</h1>
                            <a href='/Home'>Comenzar</a>
                        </div>
                    </div>
                </header>

            </div>
        // </div>
    )}
            export default index