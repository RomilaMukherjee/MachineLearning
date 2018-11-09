import React from "react";
import "../App/App.css";
import { Line } from "react-chartjs-2";
import axios from "axios";

class D3Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      xdata: [],
      ydata: [],
      showGraph:false,
      selectedOption: 'hourly',
      nextDate: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()+1)
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    //this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChartChange = this.handleChartChange.bind(this);
  }
  componentDidMount() {
    axios.get("http://172.17.80.141:8000/consumption/?nextDate="+this.state.nextDate+"&selectedOption="+this.state.selectedOption).then(res => {
      this.setState({ data: res.data.result });
    });
    this.setState({
         showGraph: true
    });
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: 'weekly'  
    });
    axios.get("http://172.17.80.141:8000/consumption/?nextDate="+this.state.nextDate+"&selectedOption=weekly").then(res => {
      this.setState({ data: res.data.result });
    });
    this.setState({
         showGraph: true
    });
  }
  handleChartChange(changeEvent){
    this.setState({
      selectedOption: 'hourly'    
    });
    axios.get("http://172.17.80.141:8000/consumption/?nextDate="+this.state.nextDate+"&selectedOption=hourly").then(res => {
      this.setState({ data: res.data.result });
    });
    this.setState({
         showGraph: true
    });
  }

  render() {
    console.log(this.state.data);
    this.state.xdata = [];
    this.state.ydata = [];
    this.state.data.map((m, index) => {
      console.log("ID is::" + m.id + " Energy value is::" + m.value);
      this.state.xdata.push(m.id);
      this.state.ydata.push(m.value);
    });

    const data = {
      labels: this.state.xdata,
      datasets: [
        {
          label: this.state.selectedOption+" prediction for "+this.state.nextDate,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.ydata
        }
      ]
    };
    console.log("render :" + this.state.xdata);
    return (
        <div className="chart" style={{marginTop: '10px'}}>
        <h3>Visualizing Data with React and Chartjs</h3>
        <div className="container" >
          <div className="row">
            <div className="col-sm-12">

              <form style={{marginBottom: '10px'}}> 
              <div style={{display: 'flex', flexDirection: 'row', marginLeft: '350px'}}>
                <div className="radio">
                  <label>
                     <input type="radio" value="hourly" style={{marginLeft: '100px', marginTop: '0px'}} checked={this.state.selectedOption === 'hourly'}  onClick={this.handleChartChange}/>
                     Hourly
                  </label>
                </div>
                <div className="radio">
                  <label style={{marginRight: '350px'}}>
                    <input type="radio" value="weekly" style={{marginLeft: '100px', marginTop: '0px'}} checked={this.state.selectedOption === 'weekly'}  onClick={this.handleOptionChange}/>
                    Weekly
                  </label>
                </div>
                
              </div>
                {this.state.showGraph && <Line data={data}/>}
              </form>
            </div>
          </div>
        </div>  
        </div>
    );
  }
}

export default D3Chart;
