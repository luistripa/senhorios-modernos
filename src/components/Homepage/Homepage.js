import './Homepage.css'
import React, {useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import Image1 from "../../static/casa1.jpg";
import Image2 from "../../static/casa2.jpg";
import Image3 from "../../static/casa3.jpg";
import catarinaImage from "../../static/catarina.jpg";
import inesImage from "../../static/ines.jpg";
import luisImage from "../../static/luis.jpg";
import raquelImage from "../../static/raquel.jpg";
import introImage from "../../static/frontpage-intro.png";
import {Footer} from "./Footer";
import {Grid} from "@mui/material";

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


    function newPage() {
        return (
            <>
                <div className={'introSection'} style={{display: "flex", flexDirection: "row"}}>

                    <Grid container xs={12}>
                        <Grid item id={'about-section'} xs={6} style={{display: "flex", alignItems: "center"}}>
                            <div style={{margin: "0 10%"}}>
                                <img src={'telhado-casa.png'}
                                     style={{width: "114px", transform: "translate(0, 20%)"}}/>
                                <div className={'titles about'}>
                                    <p style={{
                                        color: "#5D4DAA",
                                        fontWeight: '700',
                                        fontSize: '30px',
                                        margin: '0',
                                    }}> FINALLY,</p>
                                    <p style={{color: "#000000", fontWeight: '400', fontSize: '24px'}}> A WAY TO ORGANIZE YOUR
                                        HOUSES!</p>
                                </div>
                                <br/>
                                <p>
                                    OneHome website is a place for you to gather all your rented houses information in just one
                                    place!
                                </p>
                                <p>
                                    This website will help you manage all your tasks, stock and dates!
                                </p>
                                <p>
                                    All in a easy and efficient website.
                                </p>
                                <p>
                                    Create an account and start organizing right now!
                                </p>
                            </div>

                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", alignItems: "center"}}>
                            <img src={introImage} width={'100%'}></img>
                        </Grid>

                        <Grid item xs={12} id={'feature-section'}>
                            <div className={'titles services'} style={{display: 'flex', flexDirection: 'column'}}>
                                <p className={'firstTitle'}>
                                    WHAT WE DO?
                                </p>
                                <p className={'secondTitle'}>
                                    OUR FEATURES
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'services'}>
                                <div className={'service s1'}>
                                    <img src={'to-do-lists.png'}/>
                                    <div className={'description s1'}>
                                        <p className={'firstDescription'}>
                                            To-do Lists
                                        </p>
                                        <p className={'secondDescription'}>
                                            For each one of your houses!
                                        </p>
                                    </div>
                                </div>
                                <div className={'service s2'}>
                                    <img src={'to-do-lists.png'}/>
                                    <div className={'description s2'}>
                                        <p className={'firstDescription'}>
                                            Your Today Events
                                        </p>
                                        <p className={'secondDescription'}>
                                            Everything you have to do before you rest!
                                        </p>
                                    </div>
                                </div>
                                <div className={'service s3'}>
                                    <img src={'to-do-lists.png'}/>
                                    <div className={'description s3'}>
                                        <p className={'firstDescription'}>
                                            All Your Events
                                        </p>
                                        <p className={'secondDescription'}>
                                            All your houses' events together in one timeline
                                        </p>
                                    </div>
                                </div>
                                <div className={'service s4'}>
                                    <img src={'to-do-lists.png'}/>
                                    <div className={'description s4'}>
                                        <p className={'firstDescription'}>
                                            Your House Inventory
                                        </p>
                                        <p className={'secondDescription'}>
                                            All your houses' events together in one timeline
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} style={{marginTop: "5%"}} id={'team-section'}>
                            <div className={'titles team'} style={{display: 'flex', flexDirection: 'column'}}>
                                <p className={'firstTitle'}>
                                    WHO ARE WE?
                                </p>
                                <p className={'secondTitle'}>
                                    OUR TEAM
                                </p>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={'team-members'}>
                                <div className={'members firstrow'} style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className={'member m1'}>
                                        <img className={'img-member'} src={catarinaImage}/>
                                        <div className="info-member">
                                            <div className="name-member">Catarina Bento</div>
                                        </div>
                                    </div>
                                    <div className={'member m2'}>
                                        <img className={'img-member'} src={inesImage}/>
                                        <div className="info-member">
                                            <div className="name-member">Inês Costa</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'members secondrow'} style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className={'member m3'}>
                                        <img className={'img-member'} src={luisImage}/>
                                        <div className="info-member">
                                            <div className="name-member">Luís Tripa</div>
                                        </div>
                                    </div>
                                    <div className={'member m4'}>
                                        <img className={'img-member'} src={raquelImage}/>
                                        <div className="info-member">
                                            <div className="name-member">Raquel Melo</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </>
        )
    }


    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img className="CarouselPic_Home" src={Image1}/>
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

            {newPage()}

        </>
    )
}

/*
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
 */
