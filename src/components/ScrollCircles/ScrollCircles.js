import React, { useEffect, useState } from "react";
import zenscroll from 'zenscroll';

import "./ScrollCircles.css";

const ScrollCircles = () => {
    const [selectedCircle, setSelectedCircle] = useState("inspiration");
    let isScrolling = null;

    useEffect(() => {
        document.addEventListener("scroll", handleScroll, {passive: true})
        return () => {
            clearTimeout(isScrolling);
            isScrolling = null;
            document.removeEventListener("scroll", handleScroll, {passive: true})
        }
    }, []);

    const getPercentOfPageScrolled = () => {
        const circles = document.querySelector("#circle-container");
        const containerHeight = circles.offsetHeight || circles.scrollTop;
        const containerScroll = circles.getBoundingClientRect().top;
        
        if(containerScroll < 0) {
            return (Math.abs(containerScroll) / containerHeight) * 480;
        }

        else return 0;
        
    }

    const snapToSection = () => {
        const scrolled = getPercentOfPageScrolled();

        if(scrolled > 60 && scrolled < 180) {
            zenscroll.to(document.querySelector(".idea-section"));
        }

        else if(scrolled >= 180 && scrolled < 300) {
            zenscroll.to(document.querySelector(".places-section"));
        }

        else if(scrolled >= 300 && scrolled <= 360) {
            zenscroll.to(document.querySelector(".people-section"));
        }
    }

    const selectCircles = (scrolled) => { 
        if(scrolled > 60 && scrolled < 180) {
            setSelectedCircle("inspiration");
        }

        else if(scrolled >= 180 && scrolled < 300) {
            setSelectedCircle("ideation");
        }

        else if(scrolled >= 300 && scrolled <= 360) {
            setSelectedCircle("implementation");
        }

        else {
            setSelectedCircle("");
        }
    }

    const handleScroll = () => {
        window.clearTimeout( isScrolling );

        const circles = document.querySelector(".circles");
        const words = document.querySelectorAll(".circle span");
    
        const scrolled = getPercentOfPageScrolled();

        selectCircles(scrolled);
        
        if(scrolled > 0 && scrolled < 360) {
            document.querySelector(".page-practice").style.backgroundColor = "#000";
        }

        else {
            document.querySelector(".page-practice").style.backgroundColor = "#000";
        }

        if(scrolled >= 120 && scrolled <= 360) {
            circles.style.transform = `rotate(${scrolled - 120}deg)`;
            words.forEach(el => el.style.transform = `rotate(-${scrolled - 120}deg)`);
        }

        else if(scrolled > 240) {
            circles.style.transform = `rotate(${240}deg)`;
            words.forEach(el => el.style.transform = `rotate(-${240}deg)`);
        }

        else {
            circles.style.transform = `rotate(${0}deg)`;
            words.forEach(el => el.style.transform = `rotate(-${0}deg)`);
        }

        isScrolling = setTimeout(snapToSection, 66);
        
    }

    return(
        <div id="circle-container">
            <div className="circles-side">
                <div className="circles">
                    <div className={selectedCircle === "ideation" ? "circle selected-circle" : "circle"}>
                        <span>Experience</span>
                    </div>
                    <div className={selectedCircle === "implementation" ? "circle selected-circle" : "circle"}>
                        <span>People</span>
                    </div>
                    <div className={selectedCircle === "inspiration" ? "circle selected-circle" : "circle"}>
                        <span>Design</span>
                    </div>
                </div>
            </div>
            <div className="sections">
                <section className="circle-sections main-section">
                    <h2 className={selectedCircle === "inspiration" ? "text-white reg lighter" : "text-white reg lighter"}>
                        Through design, we aim to make the world a more beautiful place. With every project we work on, we create timeless and elegant solutions.
                    </h2>
                </section>
                <section className="circle-sections idea-section">
                    <h2 className={selectedCircle === "inspiration" ? "text-white reg lighter" : "text-grey reg lighter"}>
                        Through design, we aim to make the world a more beautiful place. With every project we work on, we create timeless and elegant solutions.
                    </h2>
                </section>
                <section className="circle-sections places-section">
                    <h2 className={selectedCircle === "ideation" ? "text-white reg lighter" : "text-grey reg lighter"}>
                        From signage to identity to digital we work to create cohesive design programs that clarify the user’s journey.
                    </h2>
                </section>
                <section className="circle-sections people-section">
                    <h2 className={selectedCircle === "implementation" ? "text-white reg lighter" : "text-grey reg lighter"}>
                        We deliver our clients with visually impactful solutions that make their products, places, and ideas more navigable to their target audiences.
                    </h2>
                </section>
            </div>
        </div>
    )
}

export default ScrollCircles;