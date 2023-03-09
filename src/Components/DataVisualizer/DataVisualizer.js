// AUTOMATE DATA UPLOAD AND PARSING

import { Component } from 'react';
import classes from './../Game/Game.module.css'
import { Container, Col, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tab'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import from 'bootstrap.js'

class DataVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOptionsTab: "lineGraphOptions",
            dataToGraph: [
                "programmingMinutes",
                "TVminutes",
            ],
            displayModal: false,
            errorModalText: "",
        }

        // Binding tab handler to this
        this.handleSelectTab = this.handleSelectTab.bind(this);
        this.addDataForGraph = this.addDataForGraph.bind(this);
        this.setModalMessageAndDisplay = this.setModalMessageAndDisplay.bind(this);
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.deleteDataItem = this.deleteDataItem.bind(this);
    }

    appUrl = (process.env.NODE_ENV === 'development') ? 'development' : 'production';
    appUrl = "production"

    useHttp = false;
    withDebug = false;
    portNumber = ""
    hostName = 'www.scottsherlock.one'

    // useHttp = true;
    // withDebug = true;
    // portNumber = 8000
    // hostName = 'localhost'

    dataNames = [
        'programmingMinutes', 
        'insomniaRating',
        'walkingMinutes',
        'TVminutes',
        'recreationMinutes',
        'gameMinutes',
        'productiveMinutes',
    ]

    timeGroups = [
        "Weekly",
        "Monthly",
        "DayOfWeek",
        "Daily",
        "Rolling Average = 5",
        "Rolling Average = 7",
    ]

    graphType = [
        "Bar",
        "BoxPlot",
        "Line",
    ]

    componentDidMount() {
        if (this.appUrl === 'development') {
            console.log("Using development network/other settings");
            this.withDebug = true;
            this.useHttp = true;
            this.portNumber = 8000;
            this.hostName = '0.0.0.0';
            document.getElementById('graphImage').setAttribute('src', this.makeStaticUrl("defaultImage.png"))
            // <img id="graphImage" src={this.makeStaticUrl("defaultImage.png")} alt="ERROR RENDERING GRAPH" className={classes.fitimage + classes.marginClass}></img>
        }
    }

    apiRefreshGraph() {
        // console.log("CHANGE BACK FOR PRODUCTION. SWITCHING SEEMS BUGGY. POSSIBLY BROWSER OR SOMETHING CACHING HTTPS.")
        // let httpProtocol = require('http');

        let httpProtocol;
        if (this.appUrl === "development") {
            console.log("Using HTTP")
            httpProtocol = require('http')
        } else {
            console.log("Using HTTPS")
            httpProtocol = require('https')
        }

        // let tabId = document.getElementsByClassName(['tab-pane active'])[0].getAttribute('id')
        let dataNamesArray = this.state.dataToGraph;
        if (dataNamesArray.length === 0) {
            this.setModalMessageAndDisplay("No data selected to graph!")
            return;
        }
        let name = dataNamesArray.toString();
        let tabId = this.state.activeOptionsTab;
        let timeGroup;
        let noWeekend;
        let minZero;
        let isBoxPlot;
        let normalizeData = document.getElementById('normalizeSelect').value === "Normalize Data" ? "NormalizeData" : "NoNorm"

        if (tabId === 'boxPlotOptions') {
            timeGroup = document.getElementById('timeGroup').value
            noWeekend = "IncludeWeekends"
            minZero = "AutomaticZeroMin"
            isBoxPlot = "BoxPlot";

        } else if (tabId === "lineGraphOptions") {
            isBoxPlot = "NoBoxPlot";
            timeGroup = document.getElementById('timeGroup').value
            noWeekend = document.getElementById('noWeekend').value === "weekend" ? "IncludeWeekends" : "NoWeekend"
            minZero = document.getElementById('minRange').value === "minZero"? "YZeroMin" : "AutomaticZeroMin"
        } else {
            console.log(`Unrecognized tab key '${tabId}'. API call cancelled.`)
            return;
        }

        const options = {
            hostname: this.hostName,
            port: this.portNumber,
            path: '/graph/' + name + '/' + timeGroup + '/' + noWeekend + '/' + minZero + '/' + isBoxPlot + '/' + normalizeData + '/',
            method: 'GET',
        }
        
        const req = httpProtocol.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    let newUrl = this.makeStaticUrl(body)
                    document.getElementById("graphImage").setAttribute('src', newUrl)
                }
            })

        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    makeStaticUrl(resourceName) {
        // console.log("CHANGE BACK FOR PRODUCTION. SWITCHING SEEMS BUGGY. POSSIBLY BROWSER OR SOMETHING CACHING HTTPS.")
        // let httpPrefix = "http://"

        let httpPrefix = "https://";
        // if (this.appUrl === "development")  httpPrefix = "http://"
        let portNumber = "";

        // BUG initial image load will use default value regardless
        // should be fixable
        // if (!this.useHttp)  httpPrefix = "https://"
        if (this.portNumber !== "")  portNumber = ":" + this.portNumber;

        let fullAddress = httpPrefix + this.hostName + portNumber + "/static/" + resourceName
        return fullAddress
    }

    renderDataFieldNames() {
        return(
            <div className={classes.tanBackground}>
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="dataFieldName" id="dataFieldName">
                        {this.dataNames.map( element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="dataFieldName">Data Name</label>
                    <button onClick={this.addDataForGraph}>Add</button>
                    {this.currentDataForGraph()}
                </div>
            </div>
        )
    }
    
    addDataForGraph() {
        let currentDataArray = [...this.state['dataToGraph']];
        let dataNameToAdd = document.getElementById('dataFieldName').value;
        if (!currentDataArray.includes(dataNameToAdd)) {
            currentDataArray.push(dataNameToAdd);
            this.setState({dataToGraph: currentDataArray});
        } else {
            this.setModalMessageAndDisplay("Can't add data twice.");
        }
    }

    setModalMessageAndDisplay(message) {
        this.setState({
            displayModal: true,
            errorModalText: message,
        })
    }

    handleDismissModal() {
        this.setState({displayModal: false})
    }

    currentDataForGraph() {
        return(
            this.state.dataToGraph === undefined || this.state.dataToGraph.length === 0 ?
            <div>
                <h6>No data selected to graph!</h6>
            </div>
            :
            <div>
                {this.state.dataToGraph.map((dataName, myIndex) => {
                    return(
                        <div key={dataName}>
                            <Row>
                                <Col>
                                    <p>{dataName}</p>
                                </Col>
                                <Col>
                                    <button onClick={() => {this.deleteDataItem(myIndex)} }>Delete</button>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </div>
        )
    }

    deleteDataItem(itemIndex) {
        let arrayCopy = [...this.state.dataToGraph];
        arrayCopy.splice(itemIndex, 1);
        this.setState({dataToGraph: arrayCopy})
    }
    
    renderTimeGroups() {
        return(
            <div className={'form-floating ' + classes.marginClass}>
                <select className="form-select" name="timeGroup" id="timeGroup">
                    {this.timeGroups.map(element => {
                        return(
                            <option value={element} key={element}>{element}</option>
                        )
                    })}
                </select>
                <label htmlFor="timeGroup">Time Grouping</label>
            </div>
        )
    }

    renderNormalizeDropdown() {
        return (
            <div className={'form-floating ' + classes.marginClass}>
                <select className='form-select' name='normalizeSelect' id='normalizeSelect'>
                    {["Normalize Data", "Don't Normalize Data"].map((prompt) => {
                        return (
                            <option value={prompt} key={prompt}>{prompt}</option>
                        )
                    })}
                </select>
                <label htmlFor='normalizeSelect'>Normalize Data (Good For Graphing Multiple Series at Once)</label>
            </div>
        )
    }

    renderGraphType() {
        return(
            <div>
                <label htmlFor="typeOfGraph">Type of Graph</label>
                <select name="typeOfGraph" id="typeOfGraph">
                    {this.graphType.map((element) => {
                        return(
                            <option value={element} key={element}>{element}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    renderLineGraphOptions() {
        return(
            <div id="normalOptions">
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="noWeekend" id="noWeekend">
                        <option value="weekend">Yes</option>
                        <option value="noWeekend">No</option>
                    </select>
                    <label htmlFor="noWeekend">Include Weekends</label>
                </div>
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="minRange" id="minRange">
                        <option value="automatic">No</option>
                        <option value="minZero">Yes</option>
                    </select>
                    <label htmlFor="minRange">Set minimum Y scale to 0</label>
                </div>
            </div>
        )
    }

    renderBoxPlotOptions() {
        return(
            <div id="boxOptions">
            </div>
        )
    }

    handleSelectTab(key) {
        this.setState({activeOptionsTab: key})
    }

    render() {
        return(
            <div>
                <Modal show={this.state.displayModal} onHide={this.handleDismissModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Data Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.errorModalText}</Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Container>
                    <Row>
                        <div className={classes.gamestate}>
                            <h1 className={classes.green}>Biographical Data</h1>
                            <h5>I track various things about my life as a journalling technique.</h5>
                            <h5>I also look for patterns and relationships in the data.</h5>
                            <h5>Now you can too.</h5>
                        </div>
                    </Row>
                    <Row>
                        <Col className="col-sm-4 col-12">
                            <div className={classes.gamestate}>
                                <h2>Select Options</h2>
                                <Tabs 
                                    defaultActiveKey='lineGraphOptions' 
                                    id='optionTabs' 
                                    onSelect={this.handleSelectTab}
                                    className='mb-3'
                                >
                                    <Tab eventKey={'lineGraphOptions'} title="Line Graph Options">
                                        {this.renderLineGraphOptions()}
                                    </Tab>
                                    <Tab eventKey={'boxPlotOptions'} title="Box Plot Options">
                                        {this.renderBoxPlotOptions()}
                                    </Tab>
                                </Tabs>
                                {this.renderDataFieldNames()}
                                {this.renderTimeGroups()} 
                                {this.renderNormalizeDropdown()}
                            </div>
                            <div className={classes.gamestate}>
                                <button className="btn btn-success" onClick={() => { this.apiRefreshGraph()}}>Render Graph</button>
                            </div>
                        </Col>
                        <Col className="col-sm-8 col-12">
                            <div className={classes.gamestate}>
                                <img id="graphImage" alt="LOADING" src={this.makeStaticUrl("defaultImage.png")} className={classes.fitimage + classes.marginClass}></img>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataVisualizer;