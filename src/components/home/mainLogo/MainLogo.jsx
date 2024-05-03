'use client'
import { useEffect, useRef } from 'react';
import styles from './mainLogo.module.css'

export default function MainLogo() {
    const logoRef = useRef(null);
    const h2Ref = useRef(null);
    const arrowRef = useRef(null);

    const handleArrowClick = () => {
        const introContainer = document.getElementById('introSection_intro_section__QPK58');
        introContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        const logo = logoRef.current;
        const h2 = h2Ref.current;
        const arrow = arrowRef.current;

        const handleScroll = () => {
            const logoRect = logo.getBoundingClientRect();
            const containerHeight = document.getElementById('mainLogo_main_logo__D6RDO')?.clientHeight;

            // Calcular la posición vertical absoluta del logo en el contenedor
            const logoYPosition = logoRect.top + window.scrollY - document.getElementById('mainLogo_main_logo__D6RDO')?.getBoundingClientRect().top;

            // Calcular la rotación basada en la posición vertical absoluta del logo en el contenedor
            const rotation = (logoYPosition / containerHeight) * 250;

            // Aplicar la rotación al logo
            logo.style.transform = `rotateX(${rotation}deg)`;

            // Calcular la opacidad del h2 basada en la rotación del logo
            const opacity = 1 - (rotation / 360); // 360 grados es una vuelta completa
            h2.style.opacity = opacity < 0 ? 0 : opacity; // Asegurar que la opacidad no sea negativa
            arrow.style.opacity = opacity < 0 ? 0 : opacity;

        };

        window.addEventListener('scroll', handleScroll);

        handleScroll(); // Asegurar que los elementos visibles al cargar también se animen

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <main id={styles.main_logo}>
                <div>
                    <img ref={logoRef} src={'/media/png/logo_main.png'} alt="Logo de ELA" />
                    <h2 ref={h2Ref}>Sigue bajando para ayudarnos!</h2>
                    <div ref={arrowRef} id={styles.arrow} onClick={handleArrowClick}></div>
                </div>
            </main>
        </>
    )
}