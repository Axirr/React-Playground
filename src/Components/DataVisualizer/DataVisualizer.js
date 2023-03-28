// AUTOMATE DATA UPLOAD AND PARSING

import { Component } from 'react';
// import classes from './../Game/Game.module.css'
import classes from '../Home/Home.module.css'
import { Container, Col, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
// import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

class DataVisualizer extends Component {
    constructor(props) {
        super(props);

        let interestingNameMap = new Map()
        let currentNameMap = interestingNameMap;
        // Activity minutes
        currentNameMap.set(
			'Programming Minutes', 
        	'programmingMinutes') 
        currentNameMap.set(
			'TV Minutes',
        	'TVminutes')
        currentNameMap.set(
			'Recreation Minutes',
        	'recreationMinutes')
        currentNameMap.set(
			'Game Minutes',
        	'gameMinutes')
        currentNameMap.set(
            'Movie Minutes',
			'movieMinutes' )
        currentNameMap.set(
			'Reading Minutes',
        	'readingMinutes')
        currentNameMap.set(
            'Walking Minutes',
            'walkingMinutes')
        currentNameMap.set(
			'Social Minutes',
        	'socialMinutes')
        currentNameMap.set(
			'Exercise Minutes (Non-Walking)',
        	'exerciseMinutesNonWalking')
        
        // Sleep data
        currentNameMap.set(
			'Sleep Minutes',
        	'estimatedSleepMinutes')
        currentNameMap.set(
			'Wakeup Restedness Rating',
        	'wakeupRestednessRating')
        currentNameMap.set(
			'Sleep Quality',
        	'insomniaRating')
        
        // Heartrate
        currentNameMap.set(
			'Evening Heartrate',
        	'EPostHR')
        currentNameMap.set(
			'Morning Heartrate',
        	'MPostHR')

        this.prettyDataNames = Array.from(interestingNameMap.keys())
        this.dataNames = Array.from(interestingNameMap.values())

        for (const pair of interestingNameMap) {
            this.nameMap.set(pair[0], pair[1])
        }

        let uninterestingNameMap = new Map();
        currentNameMap = uninterestingNameMap;
        currentNameMap.set(
            'Active Minutes',
            'activeMinutes')
        currentNameMap.set(
            'Productive Minutes',
            'productiveMinutes')
        currentNameMap.set(
            'Sleep Minutes, Fitbit',
            'fitbitSleepMinutes')
        currentNameMap.set(
			'Evening Breathing Quality Rating',
        	'EBreathingQualityRating')
        currentNameMap.set(
			'Evening Post-Breathing Sleepiness',
        	'ESleepyEyesRating')
        currentNameMap.set(
			'Morning Breathing Quality Rating',
        	'MBreathingQualityRating')
        currentNameMap.set(
			'Morning Post-Breathing Sleepiness',
        	'MSleepyEyesRating')
        currentNameMap.set(
			'Evening Stretch Rating',
        	'eveningStretchRating')
        currentNameMap.set(
			'Morning Stretch Rating',
        	'morningStretchRating')

        
        this.timeGroupNameMap.set(this.PRETTY_WEEKLY_TIME_GROUP, this.API_WEEKLY_TIME_GROUP)
        this.timeGroupNameMap.set("Monthly", "Monthly")
        this.timeGroupNameMap.set(this.PRETTY_DAILY_TIME_GROUP, this.API_DAILY_TIME_GROUP)
        this.timeGroupNameMap.set("Yearly", "Yearly")
        this.timeGroupNameMap.set("DayOfWeek", "DayOfWeek")
        this.timeGroupNameMap.set("Rolling Average = 5", "Rolling Average = 5")
        this.timeGroupNameMap.set("Rolling Average = 7", "Rolling Average = 7")
        
        this.prettyTimeGroups = Array.from(this.timeGroupNameMap.keys());
        this.apiTimeGroups = Array.from(this.timeGroupNameMap.values());


        this.prettyUninterestingDataNames = Array.from(uninterestingNameMap.keys())
        this.uninterestingDataNames = Array.from(this.uninterestingDataNames.values())

        for (const pair of uninterestingNameMap) {
            this.nameMap.set(pair[0], pair[1])
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
            isActiveTabBestData: true,
        }

        // Binding 'this' to handler functions
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

    dataNames = []

    prettyDataNames = []

    uninterestingDataNames = [
    ]

    prettyUninterestingDataNames = [
    ]

    nameMap = new Map()

    PRETTY_DAILY_TIME_GROUP = "Daily"
    API_DAILY_TIME_GROUP = "date"
    PRETTY_WEEKLY_TIME_GROUP = "Weekly"
    API_WEEKLY_TIME_GROUP = "Weekly"

    prettyTimeGroups = [
    ]

    apiTimeGroups = [
    ]

    timeGroupNameMap = new Map()

    minShiftValue = -10;
    maxShiftValue = 10;

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
    API_ONLY_INTERSECTION = "OnlyIntersection"
    API_UNION = "Union"

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
    }

    apiRefreshGraph() {
        let httpProtocol = this.httpNode;

        let dataNamesArray = this.state.prettyDataToGraph;
        if (dataNamesArray.length === 0) {
            this.setModalMessageAndDisplay("No data selected to graph!")
            return;
        }

        let prettyTimeGroup = document.getElementById('timeGroup').value
        let timeGroup = this.timeGroupNameMap.get(prettyTimeGroup)

        let noWeekend = document.getElementById('noWeekend').checked ? this.API_NO_WEEKEND_ARG : this.API_INCLUDE_WEEKEND_ARG;
        let minZero = this.API_AUTOMATIC_Y_MIN_ARG;
        let currentGraphName = this.graphNameMapping.get(this.state.currentGraphType);
        let normalizeData = document.getElementById('normalizeSelect').checked ? this.API_NORMALIZE_DATA_ARG : this.API_DONT_NORMALIZE_DATA_ARG;
        let disableLegend = document.getElementById('legendSelect').checked ? this.API_DISABLE_LEGEND_ARG : this.API_RENDER_LEGEND_ARG;
        let fromFirstValidDate = this.API_AUTOMATIC_START_DATE_ARG
        let onlyInteresection = document.getElementById('intersectionSelect').checked ? this.API_ONLY_INTERSECTION : this.API_UNION;

        if ((this.state.currentGraphType === this.BOXPLOT_NAME || this.state.currentGraphType === this.HISTOGRAM_NAME) && this.state.prettyDataToGraph.length > 1) {
            this.setModalMessageAndDisplay(`Multiple data not currently supported for ${this.state.currentGraphType}. Please choose other option.`);
            return
        } else if (this.state.currentGraphType === this.REGRESSION_NAME && this.state.prettyDataToGraph.length !== 2) {
            this.setModalMessageAndDisplay(`Must have selected exactly 2 series for ${this.state.currentGraphType}. Please choose other option.`);
            return
        } else if (this.state.currentGraphType === this.LINE_NAME) {
            minZero = document.getElementById('minRange').checked ? this.API_Y_MIN_ZERO_ARG : this.API_AUTOMATIC_Y_MIN_ARG;
        }

        let shiftValue = document.getElementById("shiftGroup").value;
        if (shiftValue !== "0" && this.state.prettyDataToGraph.length === 1) {
            this.setModalMessageAndDisplay("Shift option doesn't make sense for a single data series. Please add another data series.")
            return
        }

        let tempDataNamesArray = []
        for (const dataName of dataNamesArray)  tempDataNamesArray.push(this.nameMap.get(dataName))
        dataNamesArray = tempDataNamesArray
        let name = dataNamesArray.toString();

        const options = {
            hostname: this.hostName,
            port: this.portNumber,
            path: '/graph/' + name + '/' + timeGroup + '/' + noWeekend + '/' + minZero + '/' + currentGraphName + '/' + normalizeData + '/' + disableLegend + '/' + fromFirstValidDate + '/' + onlyInteresection + '/' + shiftValue + '/',
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
                let newState = {}

                // Set new url if response code okay
                if (res.statusCode === 200) {
                    let newUrl = this.makeStaticUrl(body)
                    newState['currentImageUrl'] = newUrl;
                } else {
                    newState['displayLoading'] = false;
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
        let portNumber = "";

        // Initial image load will use HTTP
        // should be fixable
        // if (!this.useHttp)  httpPrefix = "https://"
        if (this.portNumber !== "")  portNumber = ":" + this.portNumber;

        let fullAddress = this.httpPrefix + this.hostName + portNumber + "/static/" + resourceName
        return fullAddress
    }

    renderDataFieldTabs() {
        let activeStyle = {
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: '3px',
        }
        let emptyStyle = {
            opacity: '90%',
        }
        return(
            <Col>
                <Row className={classes.truetopbottommargin}>
                    <Col>
                            <Button className={classes.force100percentwidth} variant="primary" style={this.state.isActiveTabBestData ? activeStyle : emptyStyle} onClick={() => {this.changeDataTab(true)}}>Best Data</Button>
                    </Col>
                    <Col>
                            <Button className={classes.force100percentwidth} variant="primary" style={this.state.isActiveTabBestData ? emptyStyle : activeStyle} onClick={() => {this.changeDataTab(false)}}>Other Data</Button>
                    </Col>
                </Row>
                <Row>
                    {
                    this.state.isActiveTabBestData ? 
                    this.renderDataFieldNames()
                    :
                    this.renderUninterestingDataFieldNames()
                    }
                </Row>
            </Col>
        )
    }

    changeDataTab(isBestData) {
        this.setState({
            isActiveTabBestData: isBestData,
        })
    }

    renderDataFieldNames() {
        return(
            <div>
                <div className='form-floating'>
                {/* <div className={'form-floating ' + classes.force90percentwidth}> */}
                    <select className="form-select" name="dataFieldName" id="dataFieldName">
                        {this.prettyDataNames.map( element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="dataFieldName">Best Data</label>
                    <Button className={classes.minimaltopbottommargin} variant="success" onClick={() => {this.addDataForGraph('dataFieldName')}}>Add</Button>
                </div>
            </div>
        )
    }

    renderUninterestingDataFieldNames() {
        return(
            <Col>
                {/* <div className={'form-floating ' + classes.marginClass}> */}
                <div className='form-floating'>
                    <select className="form-select" name="uninterestingData" id="uninterestingData">
                        {this.prettyUninterestingDataNames.map( element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="uninterestingData">Less Interesting Data</label>
                    <Button className={classes.minimaltopbottommargin} variant="success" onClick={() => {this.addDataForGraph("uninterestingData")}}>Add</Button>
                </div>
            </Col>
        )
    }
    
    addDataForGraph(dataFieldName) {
        let currentDataArray = [...this.state.prettyDataToGraph];
        let dataNameToAdd = document.getElementById(dataFieldName).value;

        if (!currentDataArray.includes(dataNameToAdd)) {
            currentDataArray.push(dataNameToAdd);
            // currentDataArray.sort(this.stringSortFunction);
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

    renderCurrentDataForGraph() {
        return(
                <Col className={classes.minimaltopbottommargin}>
                    <Row>
                        <h4><u>Current Selected Data</u></h4>
                    </Row>
                    {/* <Row className={classes.overflowhidden}> */}
                    <Row>
                        <div className={classes.overflowscroll}>
                            {this.state.prettyDataToGraph === undefined || this.state.prettyDataToGraph.length === 0 ?
                            <div>
                                <h6>No data selected to graph!</h6>
                            </div>
                            :
                            <div>
                                {this.state.prettyDataToGraph.map((dataName, myIndex) => {
                                    return(
                                        <div key={dataName}>
                                            <Row className={classes.force100percentwidth}>
                                                <Col className="col-8">
                                                    <p>{dataName}</p>
                                                </Col>
                                                <Col className="col-2 ms-auto">
                                                    <Button variant="danger" onClick={() => {this.deleteDataItem(myIndex)} }>X</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}
                            </div>
                            }
                        </div>
                    </Row>
                </Col>
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
                        {this.prettyTimeGroups.map(element => {
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
                {this.renderOnlyIntersectionOption()}
                {/* {this.renderStartAtFirstValidDataPointDate()} */}
                {this.renderShiftTopOption()}
            </div>
        )
    }

    renderShiftTopOption() {
        let shiftValues = []
        for (let i = 0; i <= this.maxShiftValue; i++) {
            shiftValues.push(i.toString())
        }
        for (let i = this.minShiftValue; i < 0; i++) {
            shiftValues.push(i.toString())
        }
        return(
            <div>
                <div className={'form-floating ' + classes.marginClass}>
                    <select className="form-select" name="shiftGroup" id="shiftGroup">
                        {shiftValues.map(element => {
                            return(
                                <option value={element} key={element}>{element}</option>
                            )
                        })}
                    </select>
                    <label className={classes.blackText} htmlFor="shiftGroup">*EXPERIMENTAL* Shift Top Series By</label>
                </div>
            </div>
        )
    }

    renderOnlyIntersectionOption() {
        return(
            <div>
                <input className={classes.checkboxstyle} type="checkbox" id="intersectionSelect" name="intersectionSelect"></input>
                <label htmlFor="intersectionSelect">Only Graph Intersection of Series</label>
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
                <img id="graphImage" alt="LOADING" src={filename} className={classes.fitimage + " " + (this.state.displayLoading ? " " + classes.graphLoadingStyling : "")} onLoad={() => {this.setState({displayLoading: false})}}></img>
            </div>
        )
    }

    renderGraphButton(isSmall) {
        return(
        <a href="#graphImage" className={"btn btn-success " + (isSmall ? classes.fixedbutton : classes.limitButtonWidth)} onClick={() => { this.apiRefreshGraph()}}>
            {isSmall ?
            <i className="bi bi-file-earmark-bar-graph-fill"></i>
            :
            <div>
                <i className="bi bi-file-earmark-bar-graph-fill">Render Graph</i>
            </div>
            }
            <span hidden={!this.state.displayLoading} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </a>
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
                <div className={classes.fixedbutton}>
                    {this.renderGraphButton(true)}
                </div>
                <Container>
                    <Row className={classes.islandBackground}>
                            <h2>Biographical Data</h2>
                            <h4>I track various data about my life as a journalling technique.</h4>
                            <h4>I also look for patterns and relationships in the data.</h4>
                    </Row>
                    <Row>
                        <Col className="col-sm-5 col-12">
                            <Row className={classes.islandBackground}>
                                <Col>
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
                                {this.renderCurrentDataForGraph()}
                                {this.renderDataFieldTabs()}
                                <Button variant="success" className={classes.topbottommargin} onClick={() => this.setState({prettyDataToGraph: this.prettyDataNames})}>Add All Interesting Data</Button>
                                <Button variant="success" className={classes.topbottommargin} onClick={() => this.setState({prettyDataToGraph: (this.prettyDataNames.concat(this.prettyUninterestingDataNames)).sort(this.stringSortFunction)})}>Add All Data</Button>
                                <Button variant="danger" className={classes.topbottommargin} onClick={() => this.setState({prettyDataToGraph: []})}>Remove All Data</Button>
                                </Col>
                            </Row>
                            <Row>
                                {this.renderGraphButton(false)}
                            </Row>
                            <Row className={classes.islandBackground}>
                                    <h2>General Graph Options</h2>
                                    {this.renderGeneralGraphOptions()}
                            </Row>
                            <Row className={classes.islandBackground}>
                                <h2>Graph Type Specific Options</h2>
                                {this.renderCurrentGraphOption(this.state.currentGraphType)} 
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
                        </Col>
                        <Col className="col-sm-7 col-12">
                            <Row className={classes.islandBackground} href="#graphImage">
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
