import './Homepage.css'
import React, {useState} from "react";
import {TopBarBeforeLogin} from "../TopBar/TopBarBeforeLogin";
import Carousel from "react-bootstrap/Carousel";
import Image1 from "../../static/casa1.jpg";
import Image2 from "../../static/casa2.jpg";
import Image3 from "../../static/casa3.jpg";
import About_Img from "../../static/About_Img.jpg";
import Card from "react-bootstrap/Card";
import Catarina from "../../static/catarina.jpg";
import Ines from "../../static/ines.jpg";
import Luis from "../../static/luis.jpg";
import Raquel from "../../static/raquel.jpg";
import Modal from "@mui/material/Modal";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";

export const Homepage = () => {

    //Register Modal
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => setShowRegisterModal(false);

    const handleRegister = () => {
        setShowRegisterModal(true);
    }


    //ShowRegister inside Modal
    const [register, setRegister] = useState(true);

    function toggleRegister() {
        setRegister(!register);
    }

    function handleRegisterModalClose() {
        setShowRegisterModal(false);
    }

    return(
        <>
            <TopBarBeforeLogin/>

            <LoginAndRegister toggleLogin={!showRegisterModal} open={showRegisterModal} onClose={handleRegisterModalClose} />

            <Carousel>
                <Carousel.Item>
                    <img className="CarouselPic_Home" src={Image1} />
                    <Carousel.Caption>
                        <h3 className="CarouselCaption_Home">OneHome</h3>
                        <h3 className="CarouselDescription_Home">Manage every home in just one platform.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="CarouselPic_Home" src={Image2}/>
                    <Carousel.Caption>
                        <h3 className="CarouselCaption_Home">OneHome</h3>
                        <h3 className="CarouselDescription_Home">Manage every home in just one platform.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="CarouselPic_Home" src={Image3}/>
                    <Carousel.Caption>
                        <h3 className="CarouselCaption_Home">OneHome</h3>
                        <h3 className="CarouselDescription_Home">Manage every home in just one platform.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <button className="CarouselButton_Home" onClick={() => handleShowRegisterModal()}>Register now</button>

            <div className="About_Home" id="First_About_Home">
                <div className="container_Home">
                    <h1>
                        What is the OneHome project?
                    </h1>
                    <br/>
                    <p>
                        OneHome website is a place for you to gather all your rented houses information in just one place!
                        This website will help you manage all your tasks, stock and dates! All in a easy and efficient website.
                        Create an account and start organizing right now!
                    </p>

                </div>
                <div className="container_Home">
                    <img src={About_Img}/>
                </div>
            </div>

            <div className="About_Home">
                <div className="container_Home">
                    <img src={About_Img}/>
                </div>

                <div className="container_Home">
                    <h1>
                        Features
                    </h1>
                    <br/>
                    <h2>
                        In our website you can:
                    </h2>
                    <br/>
                    <p>- Add all of your houses to quickly check all of their details.</p>
                    <p>- Add all the divisions of each of your houses and manage your inventory by adding or taking items.</p>
                    <p>- Check all your tasks on one calendar where you can see the ocupation of a house or the tasks related to them.</p>
                </div>
            </div>

            <div className="About_Home">
                <div className="container_Home">
                    <h1>
                        Meet our team
                    </h1>

                    <div className="CardsContainer_Home">
                        <div className="Card_Home">
                            <Card style={{ width: '20rem' , height: '25rem'}}>
                                <Card.Img variant="top" src={Catarina} />
                                <Card.Body>
                                    <h3 className="CardTitle_Home">Catarina Bento</h3>
                                    <Card.Title>Computer Science student at FCT NOVA</Card.Title>
                                    <p className="card-text_Home">Student No.: 57369</p>
                                    <Card.Text className="card-text_Home">Email: caf.bento@campus.fct.unl.pt</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="Card_Home">
                            <Card style={{ width: '20rem' , height: '25rem'}}>
                                <Card.Img variant="top" src={Ines} />
                                <Card.Body>
                                    <h3 className="CardTitle_Home">Inês Costa</h3>
                                    <Card.Title>Computer Science student at FCT NOVA</Card.Title>
                                    <p className="card-text_Home">Student No.: 57452</p>
                                    <Card.Text className="card-text_Home">Email: imma.costa@campus.fct.unl.pt</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="Card_Home">
                            <Card style={{ width: '20rem' , height: '25rem'}}>
                                <Card.Img variant="top" src={Luis} />
                                <Card.Body>
                                    <h3 className="CardTitle_Home">Luís Tripa</h3>
                                    <Card.Title>Computer Science student at FCT NOVA</Card.Title>
                                    <p className="card-text_Home">Student No.: 57882</p>
                                    <Card.Text className="card-text_Home">Email: l.tripa@campus.fct.unl.pt</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="Card_Home">
                            <Card style={{ width: '20rem' , height: '25rem'}}>
                                <Card.Img variant="top" src={Raquel} />
                                <Card.Body>
                                    <h3 className="CardTitle_Home">Raquel Melo</h3>
                                    <Card.Title>Computer Science student at FCT NOVA</Card.Title>
                                    <p className="card-text_Home">Student No.: 57706</p>
                                    <Card.Text className="card-text_Home">Email: rc.melo@campus.fct.unl.pt</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

