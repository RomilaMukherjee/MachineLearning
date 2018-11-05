import React from "react";
//import logo from "./logo.svg";
import "../App/App.css";
import { Line } from "react-chartjs-2";
//import * as data from "./data.json";
//import styles from "./App.css";
//import { color } from "d3-color";

class D3Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showGraph:false,
      selectedOption: 'hourly',
      nextDate: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()+1)
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/monthlychart/")
      .then(response => response.json())
      .then(data => this.setState({ data: data}));
    //this.getInitialState();  
    //this.draw();
  }
/*
  draw() {
    const svg = d3.select("svg"),
      margin = { top: 50, right: 20, bottom: 50, left: 50 },
      width = 1000 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom,
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([height, 0]);
    const make_x_grid_lines = () => {
      return d3.axisBottom(x).ticks(10);
    };
    
    const make_y_gridlines = () => {
      return d3.axisLeft(y).ticks(10);
    };

    const lineCount = d3
      .line()
      .x(function(d) {
        return x(d.week);
      })
      .y(function(d) {
        return y(d.users);
      });

    x.domain(
      d3.extent(this.state.data, function(d) {
        return d.week;
      })
    );
    y.domain(
      d3.extent(this.state.data, function(d) {
        return d.users;
      })
    );
    // // add the X gridlines
    g.append("g")
      .attr("class", `grid`)
      .attr("transform", "translate(0," + height + ")")
      .call(
        make_x_grid_lines()
          .tickSize(-height)
          .tickFormat("")
      );
    //   // add the Y gridlines
    g.append("g")
      .attr("class", `grid`)
      .call(
        make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      );

    //plot the x axis
    g.append("g")
      .attr("class", `axis axis--x`)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      //plot the color legend
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -15)
      .attr("x", height - 650)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("Energy (kW)");
    g.append("g")
      .attr("class", "legend")
      .append("text")
      .attr("y", -10)
      .attr("x", width - 100)
      .text("User");
    g.append("g")
      .append("rect")
      .attr("y", -23)
      .attr("x", width - 55)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", "steelblue");

    //plot the x axis legend
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
      )
      .attr("y", height-475)
      .style("text-anchor", "middle")
      .text(this.state.selectedOption);

    g.append("path")
      .datum(this.state.data)
      .attr("class", `lineUsers`)
      .attr("d", lineCount);
  }*/

  /*getInitialState() {
    return {
      selectedOption: 'hourly'
    };
  }*/

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    alert('A name was submitted: '+ this.state.nextDate +' & ' + this.state.selectedOption);
    this.setState({
         showGraph: true
    });
    //this.draw();
    console.log('You have selected:', this.state.selectedOption);
  }
  draw(){

  }
  
  render() {
    console.log("data" + this.state.data[0]);
    return (
        <div className="chart">
        <h3>Visualizing Data with React and Chartjs</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <form onSubmit={this.handleFormSubmit}>
              <div style={{display: 'flex', flexDirection: 'row', marginLeft: '100px'}}>
                <div className="radio">
                  <label>
                     <input type="radio" value="hourly" style={{marginLeft: '100px', marginTop: '20px'}} checked={this.state.selectedOption === 'hourly'} onClick={this.handleOptionChange} onChange={this.handleOptionChange} />
                     Hourly
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="weekly" style={{marginLeft: '100px', marginTop: '20px'}} checked={this.state.selectedOption === 'weekly'} onClick={this.handleOptionChange} onChange={this.handleOptionChange}/>
                    Weekly
                  </label>
                </div>
                <button className="btn btn-default" type="submit" style={{marginLeft: '100px',color: 'white', backgroundColor: 'blue'}}>Predict</button>
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

const data = {
  labels: ["2018-11-06","2018-11-07","2018-11-08","2018-11-09","2018-11-10"],
  datasets: [
    {
      label: "My First dataset",
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
      data: [8235.8515625,  8158.4765625, 8486.0302734375, 8813.091796875, 9333.2783203125]
    }
  ]
};

export default D3Chart;
