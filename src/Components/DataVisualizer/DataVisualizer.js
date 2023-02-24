import { Component } from 'react';
import classes from './../Game/Game.module.css'
import { Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DataVisualizer extends Component {
    appUrl = (process.env.NODE_ENV === 'development') ? 'development' : 'production';
    appUrl = "production"

    useHttp = false;
    withDebug = false;
    portNumber = ""
    hostName = 'www.scottsherlock.one'

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
        }
    }

    apiRefreshGraph(name) {
        const https = require('http')

        let timeGroup = document.getElementById('timeGroup').value
        let noWeekend = document.getElementById('noWeekend').value === "weekend" ? "IncludeWeekends" : "NoWeekend"
        let minZero = document.getElementById('minRange').value === "minZero"? "YZeroMin" : "AutomaticZeroMin"

        const options = {
            hostname: this.hostName,
            port: this.portNumber,
            path: '/graph/' + name + '/' + timeGroup + '/' + noWeekend + '/' + minZero + '/',
            method: 'GET',
        }
        
        const req = https.request(options, res => {
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
        let httpPrefix = "http://";
        let portNumber = "";

        // BUG initial image load will use default value regardless
        // should be fixable
        // if (!this.useHttp)  httpPrefix = "https://"
        if (this.portNumber !== "")  portNumber = ":" + this.portNumber;

        return httpPrefix + this.hostName + portNumber + "/static/" + resourceName
    }

    renderDataFieldNames() {
        return(
            <div>
                <label htmlFor="dataFieldName">Data Name</label>
                <select name="dataFieldName" id="dataFieldName">
                    {this.dataNames.map( element => {
                        return(
                            <option value={element} key={element}>{element}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
    
    renderTimeGroups() {
        return(
            <div>
                <label htmlFor="timeGroup">Get daily average grouped by time period</label>
                <select name="timeGroup" id="timeGroup">
                    {this.timeGroups.map(element => {
                        return(
                            <option value={element} key={element}>{element}</option>
                        )
                    })}
                </select>
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

    render() {
        return(
            <div>
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
                        <Col>
                            <div className={classes.gamestate}>
                                <h2>Select Options</h2>
                                {this.renderDataFieldNames()}
                                {this.renderTimeGroups()}
                                <div>
                                    <label htmlFor="noWeekend">Include Weekends</label>
                                    <select name="noWeekend" id="noWeekend">
                                        <option value="weekend">Yes</option>
                                        <option value="noWeekend">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="minRange">Set minimum Y scale to 0</label>
                                    <select name="minRange" id="minRange">
                                        <option value="automatic">No</option>
                                        <option value="minZero">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className={classes.gamestate}>
                                <button className="btn btn-success" onClick={() => { this.apiRefreshGraph(document.getElementById("dataFieldName").value)}}>Render Graph</button>
                            </div>
                        </Col>
                        <Col>
                            <img id="graphImage" src={this.makeStaticUrl("defaultImage.png")} alt="ERROR RENDERING"></img>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataVisualizer;