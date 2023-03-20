import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import princessCard from '../LoveLetter/CardImages/princess.png';
import kingTokyo from '../Shogun/kingOfTokyo.png';
import portrait from './portrait.png';
import canadaFlag from './canadaFlag.png';
import uofaLogo from './uofalogo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.module.css';
import classes from './Home.module.css'

class Home extends Component {
    render() {
        let cardStyle = {
            marginTop: '10px',
            marginBottom: '10px',
        }

        let thumbnailStyle = {
            border: '1px solid white', /* Gray border */
            borderRadius: '4px',  /* Rounded border */
            padding: '5px', /* Some padding */
            width: '100%', /* Set a small width */
            maxWidth: '200px',
            maxHeight: '200px',
            aspectRatio: '1 / 1',
            objectFit: 'contain',
        }

        let logosStyle = {
            padding: '5px', /* Some padding */
            width: '100%', /* Set a small width */
            height: '50%',
            maxWidth: '125px',
            maxHeight: '125px',
        }

        return(
            <div className={classes.homebody}>
            <Container>
                <Row>
                    <div className='col-12'>
                        <div className={'row'}>
                            <div className='col-sm-4 col-xs-12' style={cardStyle}>
                                <h5>About Me</h5>
                                <img src={portrait} style={thumbnailStyle} alt="self portrait"/>
                            </div>
                            <div className='col-sm-6 col-xs-10 my-auto'>
                                <p>
                                    I'm a Computer Science graduate from the University of Alberta. Prior to Computer Science, I worked as a lawyer
                                    at a large law firm in Western Canada.
                                </p>
                                <p>
                                    I have broad interests but I am currently focusing on web development and 
                                    data visualization.
                                </p>
                            </div>
                            <div className='col-sm-2 col-xs-2 my-auto'>
                                <img style={logosStyle} src={uofaLogo} alt="universityOfAlbertaLogo"></img>
                                <img style={logosStyle} src={canadaFlag} alt="canadaFlag"></img>
                                <div style={{margin: '5px auto 5px auto'}}>
                                    <a style={{color: '#28a745'}} href='https://github.com/Axirr'>Github Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <hr style={{color: 'white', width: '90vw', margin: '15px auto 15px auto'}} />
                </Row>
                <Row>
                    <h1>Side Projects</h1>
                </Row>
                <Row>
                    <hr style={{color: 'white', width: '90vw', margin: '15px auto 15px auto'}} />
                </Row>
                <Row>
                    <div className='col-sm-4 col-xs-2' style={cardStyle}>
                        <h5>Biographical Data Visualizations <Badge bg="danger">Active Development</Badge></h5>
                        <img src="https://www.scottsherlock.one/static/defaultImage.png" style={thumbnailStyle} alt="sampleGraph"/>
                    </div>
                    <div className='col-sm-8 col-xs-10 my-auto'>
                        <Row>
                        <div>Get to know me by making data visualizations with data from my life.</div>
                        <div>Select various graph types and graph daily averages across different time groups:</div>
                        </Row>
                        <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                            <div className='col'>
                                <ul className={classes.nobulletlist}>
                                    <li className={classes.greenlistheading}>Graph Types</li>
                                    <li>Line Graph</li>
                                    <li>Bar Graph</li>
                                    <li>Boxplot</li>
                                    <li>Histogram</li>
                                    <li>Linear Regression</li>
                                </ul>
                            </div>
                            <div className='col'>
                                <ul className={classes.nobulletlist}>
                                    <li className={classes.greenlistheading}>Time Groups</li>
                                    <li>Daily</li>
                                    <li>Weekly</li>
                                    <li>Monthly</li>
                                    <li>Day of the Week</li>
                                    <li>Rolling Average</li>
                                </ul>
                            </div>
                        </Row>
                                <Button variant="primary" className={classes.limitButtonWidth} href='/datavisualizer'>Try It Out</Button>
                    </div>
                </Row>
                <Row>
                    <hr style={{color: 'white', width: '90vw', margin: '15px auto 15px auto'}} />
                </Row>
                <Row>
                    <div className='col-sm-4 col-xs-2' style={cardStyle}>
                        <h5>Love Letter Card Game <Badge bg="secondary">Stable</Badge></h5>
                        <img src={princessCard} style={thumbnailStyle} alt="princessCard"/>
                    </div>
                    <div className='col-sm-8 col-xs-10 my-auto'>
                        <p>Play the card game 'Love Letter' against computer opponents.</p>
                        <Button variant="primary" className={classes.limitButtonWidth} href='/loveletter'>Try It Out</Button>
                    </div>
                </Row>
                <Row>
                    <hr style={{color: 'white', width: '90vw', margin: '15px auto 15px auto'}} />
                </Row>
                <Row>
                    <div className='col-sm-4 col-xs-2' style={cardStyle}>
                        <h5>King of Tokyo Board Game <Badge bg="secondary">Stable</Badge></h5>
                        <img src={kingTokyo} style={thumbnailStyle} alt="kingOfTokyo"/>
                    </div>
                    <div className='col-sm-8 col-xs-10 my-auto'>
                        <p>Play the board game 'King of Tokyo' against other people (or test it out on your own).</p>
                        <Button variant="primary" className={classes.limitButtonWidth} href='/netshogun'>Try It Out</Button>
                    </div>
                </Row>
                <Row>
                    <hr style={{color: 'white', width: '90vw', margin: '15px auto 15px auto'}} />
                </Row>
                <Row>
                    <Col>
                        <h5>Check the Projects tab for more!</h5>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default Home;