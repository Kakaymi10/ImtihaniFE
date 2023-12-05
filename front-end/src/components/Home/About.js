import React from "react";
import "./About.css";

function About(){
    return(
        <div className="about" id="About">
            <h1 className="about_title">A propos de nous</h1>
            <p>En tant que collectif engagé, nous formons Chad Learn Hub pour propulser l'éducation au Tchad. Notre mission est d'instaurer un accès équitable aux ressources éducatives, d'améliorer nos parcours académiques et d'enrichir notre expérience d'apprentissage. Ensemble, nous façonnons l'avenir éducatif de notre communauté
            </p>
            <div className="btn">
                <button className="try_out btn_abt"><a href="https://front-end-pi-lilac.vercel.app/imtihani">Check it out</a></button>
            </div>
        </div>
    )
}

export default About;