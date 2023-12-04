import React from "react";
import "./Banner.css";
import banner from './../../assets/learn.png'

function Banner(){
    const text = ` Élevons l'éducation au Tchad en créant un hub éducatif qui démocratise l'accès aux ressources éducatives, améliorons les performances académiques et enrichissons l'expérience d'apprentissage pour chaque éleve.`;
    const upperCaseText = text;

    return(
        <div className="main_ban" id="Banner">
            <div className="ban1">
                <h1>{upperCaseText}</h1>
                <h2 className="ban_sec">Enhancing Engagement, Elevating Campus Life!</h2>

                <div className="btn">

                </div>
            </div>
            <div className="ban2">
                <img className="ban_img" src={banner} alt="banner"/>
            </div>
        </div>
    )
}

export default Banner;