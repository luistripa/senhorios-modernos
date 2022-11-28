import './Footer.css';
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DraftsIcon from '@mui/icons-material/Drafts';

export const Footer = () => {
    return (
        <div className="footer" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <hr className="footer-seperator"/>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: "space-around"}}>
                <div className="footer-contact" style={{display: 'flex', flexDirection: 'column'}}>
                    <p className={'footer-titles'}> FIND US </p>
                    <p className={'footer-p'}>Departamento de Informática,</p>
                    <p className={'footer-p'}>Faculdade de Ciências e Tecnologias,</p>
                    <p className={'footer-p'}>Universidade Nova de Lisboa,</p>
                    <p className={'footer-p'}>Largo da Torre, 2825-149 Caparica </p>
                </div>
                <div className="footer-menu" style={{display: 'flex', flexDirection: 'column'}}>
                    <p className={'footer-titles'}>MENU</p>
                    <a href={"/#about-section"} className={'footer-p'}>About One Home</a>
                    <a href={"/#feature-section"} className={'footer-p'}>Features</a>
                    <a href={"/#team-section"} className={'footer-p'}>Team</a>
                </div>
                <div className="footer-socialmedia" style={{display: 'flex', flexDirection: 'column'}}>
                    <p className={'footer-titles'}>CONTACT US</p>
                    <a href="https://licripm2022.wixsite.com/webstormers" target="_blank" rel="noopener noreferrer" className={'footer-p'}>Our Website</a>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center', paddingTop:'6%'}}>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={'footer-icon'}><LinkedInIcon fontSize={'large'}/></a>
                        <a href="https://github.com/luistripa/senhorios-modernos" target="_blank" rel="noopener noreferrer" className={'footer-icon'}><GitHubIcon fontSize={'large'}/></a>
                        <a href="mailto: licr.ipm2022@gmail.com" target="_blank" rel="noopener noreferrer" className={'footer-icon'}><DraftsIcon fontSize={'large'}/></a>
                    </div>
                </div>
            </div>
            <hr className="footer-seperator"/>
            <div className={'copyrights'}>
                © 2022 by WebStormers.
            </div>
        </div>
    )
        ;
}

// <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>