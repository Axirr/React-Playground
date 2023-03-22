// AUTOMATE DATA UPLOAD AND PARSING

import { Component } from 'react';
// import classes from './../Game/Game.module.css'
import classes from '../Home/Home.module.css'
import { Container, Col, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
// import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button'

class DataVisualizer extends Component {
    constructor(props) {
        super(props);

        for (let i = 0; i < this.prettyDataNames.length; i++) {
            this.nameMap.set(this.prettyDataNames[i], this.dataNames[i])
        }

        this.prettyDataNames = this.prettyDataNames.sort(this.stringSortFunction)

        let defaultData = "Programming Minutes";

        this.state = {
            prettyDataToGraph: [defaultData],
            displayModal: false,
            errorModalText: "",
            currentGraphType: "Line",
            currentImageUrl: this.makeStaticUrl("defaultImage.png"),
            displayLoading: false,
            displayDataSeries: true,
        }

        // Binding this to handler functions
        this.addDataForGraph = this.addDataForGraph.bind(this);
        this.setModalMessageAndDisplay = this.setModalMessageAndDisplay.bind(this);
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.deleteDataItem = this.deleteDataItem.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);

        this.graphNameMapping = new Map();
        this.graphNameMapping.set(this.LINE_NAME, this.LINE_NAME);
        this.graphNameMapping.set(this.BAR_NAME, this.BAR_NAME);
        this.graphNameMapping.set(this.BOXPLOT_NAME, this.BOXPLOT_NAME);
        this.graphNameMapping.set(this.HISTOGRAM_NAME, this.HISTOGRAM_NAME);
        this.graphNameMapping.set(this.REGRESSION_NAME, this.API_REGRESSION_ARG);

    }

    appUrl = (process.env.NODE_ENV === 'development') ? 'development' : 'production';

    // http is set as the default so that first image loads correctly before componentDidMount
    // But should change this
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
        'fitbitSleepMinutes',
        'estimatedSleepMinutes',
        'wakeupRestednessRating',
        'screenIntensiveMinutes',
        'readingMinutes',
        'activeMinutes',
        'clarityRating',
        'productivityRating',
        'exerciseMinutesNonWalking',
        'eveningStretchRating',
        'EBreathingQualityRating',
        'EPostHR',
        'ESleepyEyesRating',
        'MBreathingQualityRating',
        'MPostHR',
        'MSleepyEyesRating',
        'socialMinutes',
    ]

    prettyDataNames = [
        'Programming Minutes', 
        'Insomnia Rating',
        'Walking Minutes',
        'TV Minutes',
        'Recreation Minutes',
        'Game Minutes',
        'Productive Minutes',
        'Sleep Minutes, Fitbit',
        'Sleep Minutes, Subjective',
        'Wakeup Restedness Rating',
        'Screen Intensive Minutes',
        'Reading Minutes',
        'Active Minutes',
        'Clarity Rating',
        'Productivity Rating',
        'Exercise Minutes Non-Walking',
        'Evening Stretch Rating',
        'Evening Breathing Quality Rating',
        'Evening Breathing Heartrate',
        'Evening Post-Breathing Sleepiness',
        'Morning Breathing Quality Rating',
        'Morning Breathing Heartrate',
        'Morning Post-Breathing Sleepiness',
        'Social Minutes',
    ]

    nameMap = new Map()

    timeGroups = [
        "Weekly",
        "Monthly",
        "DayOfWeek",
        "Daily",
        "Rolling Average = 5",
        "Rolling Average = 7",
    ]

    LINE_NAME = "Line"
    BOXPLOT_NAME = "BoxPlot"
    BAR_NAME = "Bar"
    REGRESSION_NAME = "Simple Linear Regression"
    HISTOGRAM_NAME = "Histogram"

    API_REGRESSION_ARG = "SimpleLinearRegression"
    API_NO_WEEKEND_ARG = "NoWeekend"
    API_INCLUDE_WEEKEND_ARG = "IncludeWeekends"
    API_AUTOMATIC_Y_MIN_ARG = "AutomaticZeroMin"
    API_Y_MIN_ZERO_ARG = "YZeroMin"
    API_NORMALIZE_DATA_ARG = "NormalizeData"
    API_DONT_NORMALIZE_DATA_ARG = "NoNorm"
    API_DISABLE_LEGEND_ARG = "NoLegend"
    API_RENDER_LEGEND_ARG = "RenderLegend"
    API_START_FIRST_VALID_DATE_ARG = "FirstValidDate"
    API_AUTOMATIC_START_DATE_ARG = "NotFirstDate"

    graphType = [
        this.LINE_NAME,
        this.BOXPLOT_NAME,
        this.BAR_NAME,
        this.HISTOGRAM_NAME,
        this.REGRESSION_NAME,
    ]

    newGraphTypes = [
        this.HISTOGRAM_NAME,
        this.REGRESSION_NAME,
    ]


    componentDidMount() {
        if (this.appUrl === 'development') {
            console.log("Using development network/other settings");
            this.withDebug = true;
            this.useHttp = true;
            this.portNumber = 8000;
            this.hostName = 'localhost';
            document.getElementById('graphImage').setAttribute('src', this.makeStaticUrl("defaultImage.png"))
        } else {
            this.useHttp = false;
            this.httpNode = require('https');
            this.httpPrefix = "https://"
        }
    }

    stringSortFunction(string1, string2) {
        if (string1 === string2)  return 0;
        if (string1 < string2) return -1;
        return 1
        // (string1, string2) => string1 === string2 ? 0 : (string1 < string2 ? -1 : 1))
    }

    apiRefreshGraph() {
        let httpProtocol = this.httpNode;

        let dataNamesArray = this.state.prettyDataToGraph;
        if (dataNamesArray.length === 0) {
            this.setModalMessageAndDisplay("No data selected to graph!")
            return;
        }

        let timeGroup = document.getElementById('timeGroup').value
        let noWeekend = document.getElementById('noWeekend').checked ? this.API_NO_WEEKEND_ARG : this.API_INCLUDE_WEEKEND_ARG;
        let minZero = this.API_AUTOMATIC_Y_MIN_ARG;
        let currentGraphName = this.graphNameMapping.get(this.state.currentGraphType);
        let normalizeData = document.getElementById('normalizeSelect').checked ? this.API_NORMALIZE_DATA_ARG : this.API_DONT_NORMALIZE_DATA_ARG;
        let disableLegend = document.getElementById('legendSelect').checked ? this.API_DISABLE_LEGEND_ARG : this.API_RENDER_LEGEND_ARG;
        let fromFirstValidDate = document.getElementById('startAtFirstValidDate').checked ? this.API_START_FIRST_VALID_DATE_ARG : this.API_AUTOMATIC_START_DATE_ARG;

        if ((this.state.currentGraphType === this.BOXPLOT_NAME || this.state.currentGraphType === this.HISTOGRAM_NAME) && this.state.prettyDataToGraph.length > 1) {
            this.setModalMessageAndDisplay(`Multiple data not currently supported for ${this.state.currentGraphType}. Please choose other option.`);
            return
        } else if (this.state.currentGraphType === this.REGRESSION_NAME && this.state.prettyDataToGraph.length !== 2) {
            this.setModalMessageAndDisplay(`Must have selected exactly 2 series for ${this.state.currentGraphType}. Please choose other option.`);
            return
        } else if (this.state.currentGraphType === this.LINE_NAME) {
            minZero = document.getElementById('minRange').checked ? this.API_Y_MIN_ZERO_ARG : this.API_AUTOMATIC_Y_MIN_ARG;
        }

        let tempDataNamesArray = []
        for (const dataName of dataNamesArray)  tempDataNamesArray.push(this.nameMap.get(dataName))
        dataNamesArray = tempDataNamesArray
        let name = dataNamesArray.toString();

        const options = {
            hostname: this.hostName,
            port: this.portNumber,
            path: '/graph/' + name + '/' + timeGroup + '/' + noWeekend + '/' + minZero + '/' + currentGraphName + '/' + normalizeData + '/' + disableLegend + '/' + fromFirstValidDate + '/',
            method: 'GET',
        }

        this.setState({displayLoading: true});
        const req = httpProtocol.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', () => {
                let newState = {displayLoading: false}

                // Set new url if response code okay
                if (res.statusCode === 200) {
                    let newUrl = this.makeStaticUrl(body)
                    newState['currentImageUrl'] = newUrl;
                }

                this.setState(newState)
            })

        })

        req.on('error', error => {
            console.error(error)
            this.setState({
                displayLoading: false,
            })
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
            <div>
                {/* <div className={'form-floating ' + classes.marginClass}> */}
                <div className='form-floating'>
                    <select className="form-select" name="dataFieldName" id="dataFieldName">
                        {this.prettyDataNames.map( element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="dataFieldName">Data Name</label>
                    <Button className={classes.minimaltopbottommargin} variant="success" onClick={this.addDataForGraph}>Add</Button>
                </div>
            </div>
        )
    }
    
    addDataForGraph() {
        let currentDataArray = [...this.state.prettyDataToGraph];
        let dataNameToAdd = document.getElementById('dataFieldName').value;

        if (!currentDataArray.includes(dataNameToAdd)) {
            currentDataArray.push(dataNameToAdd);
            currentDataArray.sort(this.stringSortFunction);
            this.setState({
                prettyDataToGraph: currentDataArray,
            });
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
            <div>
                <h4><u>Current Selected Data</u></h4>
                {this.state.prettyDataToGraph === undefined || this.state.prettyDataToGraph.length === 0 ?
                <div>
                    <h6>No data selected to graph!</h6>
                </div>
                :
                <div>
                    {this.state.prettyDataToGraph.map((dataName, myIndex) => {
                        return(
                            <div key={dataName}>
                                <Row>
                                    <Col className="col-auto me-auto">
                                        <p>{dataName}</p>
                                    </Col>
                                    <Col className="col-auto">
                                        {/* <Button variant="danger" className={classes.centerautomargin} onClick={() => {this.deleteDataItem(myIndex)} }>Delete</Button> */}
                                        <Button variant="danger" onClick={() => {this.deleteDataItem(myIndex)} }>X</Button>
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
        let arrayCopy = [...this.state.prettyDataToGraph];
        arrayCopy.splice(itemIndex, 1);
        this.setState({prettyDataToGraph: arrayCopy})
    }
    
    renderTimeGroups() {
        return(
            <div>
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="timeGroup" id="timeGroup">
                        {this.timeGroups.map(element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="timeGroup">Time Grouping</label>
                </div>
            </div>
        )
    }

    renderGraphType() {
        return(
            <div>
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="typeOfGraph" id="typeOfGraph" onChange={() => {
                        let myValue = document.getElementById("typeOfGraph").value;
                        this.handleGraphTypeChange(myValue);
                    }}>
                        {this.graphType.map((element) => {
                            let isNewGraph = false;
                            if (this.newGraphTypes.indexOf(element) !== -1)  isNewGraph = true;
                            return(
                                <option value={element} key={element} style={isNewGraph ? {color: 'red'} : {}}>{element + (isNewGraph ? " *NEW*" : "")}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="typeOfGraph">Type of Graph</label>
                </div>
            </div>
        )
    }

    handleGraphTypeChange(graphType) {
        this.setState({currentGraphType: graphType});
    }

    renderCurrentGraphOption(currentGraphName) {
        let internalHtml;
        if (currentGraphName === this.LINE_NAME) {
            internalHtml = this.renderLineGraphOptions();
        } else {
            internalHtml = this.renderNoSpecificGraphTypeOptions(currentGraphName)
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
                <input className={classes.checkboxstyle}  type="checkbox" id="minRange" name="minRange" />
                <label htmlFor="minRange">Set minimum Y axis to 0?</label>
            </div>
        )
    }

    renderGeneralGraphOptions() {
        return(
            <div>
                {this.renderNormalizeSelector()}
                {this.renderDisableLegend()}
                {this.renderStartAtFirstValidDataPointDate()}
            </div>
        )
    }

    renderDisableLegend() {
        return (
            <div>
                <input className={classes.checkboxstyle} type="checkbox" id="legendSelect" name="legendSelect"></input>
                <label htmlFor="legendSelect">Disable Legend</label>
            </div>
        )
    }

    renderStartAtFirstValidDataPointDate() {
        return(
            <div>
                <input className={classes.checkboxstyle}  type="checkbox" id="startAtFirstValidDate" name="startAtFirstValidDate"></input>
                <label htmlFor="startAtFirstValidDate">Graph from first non-zero date</label>
            </div>
        )
    }

    renderNormalizeSelector() {
        return (
            <div>
                <input className={classes.checkboxstyle}  type="checkbox" id="normalizeSelect" name="normalizeSelect"></input>
                <label htmlFor="normalizeSelect">Uniform Scale</label>
            </div>
        )
    }

    renderIncludeWeekendsCheckbox() {
        return(
            <div>
                <input className={classes.checkboxstyle}  type="checkbox" id="noWeekend" name="noWeekend" />
                <label htmlFor="noWeekend">Exclude weekends?</label>
            </div>
        )
    }

    renderNoSpecificGraphTypeOptions(graphType) {
        return(
            <div id="boxOptions">
                <h6>No Specific Options For {graphType}</h6>
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

    renderGraphImage(filename) {
        return(
            <div>
                {/* <img id="graphImage" alt="LOADING" src={filename} className={classes.fitimage + " " + classes.marginClass + (this.state.displayLoading ? " " + classes.graphLoadingStyling : "")}></img> */}
                <img id="graphImage" alt="LOADING" src={filename} className={classes.fitimage + " " + (this.state.displayLoading ? " " + classes.graphLoadingStyling : "")}></img>
            </div>
        )
    }

    render() {
        return(
            <div className={classes.dv}>
                <Modal show={this.state.displayModal} onHide={this.handleDismissModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Data Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.errorModalText}</Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Container>
                    {/* <div className={'row ' + classes.islandBackground}> */}
                    <Row className={classes.islandBackground}>
                            <h2>Biographical Data</h2>
                            <h4>I track various data about my life as a journalling technique.</h4>
                            <h4>I also look for patterns and relationships in the data.</h4>
                            <h4>Now you can too.</h4>
                    </Row>
                    <Row>
                        <Col className="col-sm-4 col-12">
                            <Row className={classes.islandBackground}>
                                {/* <div className='row justify-content-end'>
                                    <div className='col-1 offset-11'>
                                        {/* <div className={'btn btn-secondary ' + classes.collapsebutton}>^</div> */}
                                        {/* <button className={classes.collapsebutton} dataToggle="collapse" dataTarget="dataSeries">^</button> */}
                                        {/* <a className="btn btn-primary" data-toggle="collapse" href="#dataSeries" role="button" aria-expanded="false" aria-controls="collapseExample">Link with href</a> */}
                                        {/* <Button onClick={() => {this.setState({displayDataSeries: !this.state.displayDataSeries})}}>Test</Button> */}
                                    {/* </div>
                                </div>
                                <Row>
                                    <hr/>
                                </Row> */}
                                <h2>Data to Graph</h2>
                                {this.currentDataForGraph()}
                                {this.renderDataFieldNames()}
                                <Button variant="success" className={classes.topbottommargin} onClick={() => this.setState({prettyDataToGraph: this.prettyDataNames})}>Add All Data</Button>
                                <Button variant="danger" className={classes.topbottommargin} onClick={() => this.setState({prettyDataToGraph: []})}>Remove All Data</Button>
                            </Row>
                            <Row>
                                <button className={"btn btn-success " + classes.limitButtonWidth} onClick={() => { this.apiRefreshGraph()}}>Render Graph
                                    <span hidden={!this.state.displayLoading} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                            </Row>
                            <Row className={classes.islandBackground}>
                                    <h2>General Graph Options</h2>
                                    {this.renderGeneralGraphOptions()}
                            </Row>
                            <Row className={classes.islandBackground}>
                                    <h2>Time Group for Average</h2>
                                    {this.renderTimeGroups()} 
                                    {this.renderIncludeWeekendsCheckbox()}
                            </Row>
                            <Row className={classes.islandBackground}>
                                <Col>
                                    <h2>Graph Type<Badge bg="info" className={classes.badgeblacktext + " " + classes.smallleftmargin}>*New Types Added*</Badge></h2>
                                    {this.renderGraphType()}
                                </Col>
                            </Row>
                            <Row className={classes.islandBackground}>
                                <h2>Graph Type Specific Options</h2>
                                {this.renderCurrentGraphOption(this.state.currentGraphType)} 
                            </Row>
                        </Col>
                        <Col className="col-sm-8 col-12">
                            <Row className={classes.islandBackground}>
                                {this.renderGraphImage(this.state.currentImageUrl)}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataVisualizer;
