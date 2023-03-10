// AUTOMATE DATA UPLOAD AND PARSING

import { Component } from 'react';
import classes from './../Game/Game.module.css'
import { Container, Col, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tab'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
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
            currentGraphType: "Line",
        }

        // Binding tab handler to this
        this.handleSelectTab = this.handleSelectTab.bind(this);
        this.addDataForGraph = this.addDataForGraph.bind(this);
        this.setModalMessageAndDisplay = this.setModalMessageAndDisplay.bind(this);
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.deleteDataItem = this.deleteDataItem.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
    }

    appUrl = (process.env.NODE_ENV === 'development') ? 'development' : 'production';
    // appUrl = "production"

    // http is set as the default so that first image loads correctly before componentDidMount
    useHttp = true;
    httpNode = require('http')

    httpPrefix = "http://"
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
        "Line",
        "BoxPlot",
        "Bar",
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
        } else {
            this.useHttp = false;
            this.httpNode = require('https');
            this.httpPrefix = "https://"
        }
    }

    apiRefreshGraph() {
        let httpProtocol = this.httpNode;

        let dataNamesArray = this.state.dataToGraph;
        if (dataNamesArray.length === 0) {
            this.setModalMessageAndDisplay("No data selected to graph!")
            return;
        }
        let name = dataNamesArray.toString();
        // let tabId = this.state.activeOptionsTab;
        let timeGroup = document.getElementById('timeGroup').value
        let noWeekend = document.getElementById('noWeekend').checked ? "NoWeekend" : "IncludeWeekends";
        let minZero = "AutomaticZeroMin";
        let isBoxPlot = this.state.currentGraphType;
        let normalizeData = document.getElementById('normalizeSelect').checked ? "NormalizeData" : "NoNorm"

        if (this.state.currentGraphType === "BoxPlot" && this.state.dataToGraph.length > 1) {
            this.setModalMessageAndDisplay("Multiple data not currently supported for Box Plot. Please choose other option.");
            return
        } else if (this.state.currentGraphType === "Line") {
            minZero = document.getElementById('minRange').checked ? "YZeroMin" : "AutomaticZeroMin"
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

        // let httpPrefix = "https://";
        // if (this.appUrl === "development")  httpPrefix = "http://"
        let portNumber = "";

        // BUG initial image load will use default value regardless
        // should be fixable
        // if (!this.useHttp)  httpPrefix = "https://"
        if (this.portNumber !== "")  portNumber = ":" + this.portNumber;

        let fullAddress = this.httpPrefix + this.hostName + portNumber + "/static/" + resourceName
        return fullAddress
    }

    renderDataFieldNames() {
        return(
            <div >
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
            <div className={classes.tanBackground}>
                <h4><u>Current Data Series To Be Graphed</u></h4>
                {this.state.dataToGraph === undefined || this.state.dataToGraph.length === 0 ?
                <div>
                    <h6>No data selected to graph!</h6>
                </div>
                :
                // <div className={classes.tanBackground}>
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
                }
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

    renderGraphType() {
        return(
            <div>
                <label htmlFor="typeOfGraph">Type of Graph</label>
                <select name="typeOfGraph" id="typeOfGraph" onChange={() => {
                    let myValue = document.getElementById("typeOfGraph").value;
                    this.handleGraphTypeChange(myValue);
                }}>
                    {this.graphType.map((element) => {
                        return(
                            <option value={element} key={element}>{element}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    handleGraphTypeChange(graphType) {
        this.setState({currentGraphType: graphType});
    }

    renderCurrentGraphOption(currentGraphName) {
        let internalHtml;
        if (currentGraphName === "Line") {
            internalHtml = this.renderLineGraphOptions();
        } else if (currentGraphName === "BoxPlot") {
            internalHtml = this.renderBoxPlotOptions();
        } else if (currentGraphName === "Bar") {
            internalHtml = this.renderBarPlotOptions();
        }

        return(
        <div>
            {internalHtml}
        </div>
        )
    }

    renderLineGraphOptions() {
        return(
            <div>
                <input type="checkbox" id="minRange" name="minRange" />
                <label htmlFor="minRange">Set minimum Y axis to 0?</label>
            </div>
        )
    }

    renderExcludeDataOptions() {
        return(
            <div className={classes.tanBackground}>
                <div>
                    <h6>Data Filtering</h6>
                </div>
                {this.renderIncludeWeekendsCheckbox()}
                {this.renderNormalizeDropdown()}
            </div>
        )
    }

    renderNormalizeDropdown() {
        return (
            <div>
                <input type="checkbox" id="normalizeSelect" name="normalizeSelect"></input>
                <label htmlFor="normalizeSelect">Normalize Data (Good for Graphing Multiple Data Sets)</label>
            </div>
        )
    }

    renderIncludeWeekendsCheckbox() {
        return(
            <div>
                <input type="checkbox" id="noWeekend" name="noWeekend" />
                <label htmlFor="noWeekend">Exclude weekends?</label>
            </div>
        )
    }

    renderBoxPlotOptions() {
        return(
            <div id="boxOptions">
                <h6>No Specific Options For Box Plot</h6>
            </div>
        )
    }

    renderBarPlotOptions() {
        return(
            <div id="barOptions">
                <h6>No Specific Options for Bar Plot</h6>
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
                                <Row>
                                    <h2>Select Options</h2>
                                </Row>
                                <Row>
                                {this.currentDataForGraph()}
                                </Row>
                                <Row>
                                {this.renderDataFieldNames()}
                                </Row>
                                <Row>
                                {this.renderTimeGroups()} 
                                </Row>
                                <Row>
                                {this.renderExcludeDataOptions()}
                                </Row>
                                <Row>
                                    {this.renderGraphType()}
                                    {this.renderCurrentGraphOption(this.state.currentGraphType)} 
                                </Row>
                                {/* <Tabs 
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
                                </Tabs> */}
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