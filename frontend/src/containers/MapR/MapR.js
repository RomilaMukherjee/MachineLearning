import React,{Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Redirect } from 'react-router-dom';
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import "../App/App.css";
import axios from "axios";

const MY_API_KEY = "AIzaSyBbEJXlZq7VqPqY3jUITMsy_ZWlgVUhyvQ" 
class Popup extends React.Component {
    state = {
      search: "",
      value: "",
  }
   handleInputChange = e => {
      this.setState({search: e.target.value, value: e.target.value})
  }
   handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
      console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
      this.setState({search: "", value: geocodedPrediction.formatted_address})
  }
   render() {
      const {search, value} = this.state
      return (
        <div className='popup'>
        <div className='popup_inner'>
          <GoogleMapLoader
              params={{
                  key: MY_API_KEY,
                  libraries: "places,geocode",
              }}
              render={googleMaps =>
                  googleMaps && (
                      <GooglePlacesSuggest
                          googleMaps={googleMaps}
                          autocompletionRequest={{
                              input: search,
                              // Optional options
                              // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                          }}
                          // Optional props
                        onSelectSuggest={this.handleSelectSuggest}
                        textNoResults="No Results" 
                        customRender={prediction => (
                            <div className="customWrapper">
                                {prediction
                                    ? prediction.description
                                    : "No Result"
                                }
                            </div>
                        )}
                    >
                    <label name="Search for the location:" style={{marginLeft: '100px',marginRight: '200px',color: 'white', backgroundColor: 'blue'}}/>
                        <input className='location-search-input'
                            type="text"
                            value={value}
                            placeholder="Search a location"
                            onChange={this.handleInputChange}
                            style={{marginLeft: '-187px'}}
                        />
                        <button className="btn btn-default" onClick={this.props.closePopup} style={{mariginLeft:'50px',color: 'white', backgroundColor: 'blue'}}>Add</button>
                        <button onClick={this.props.closePopup} style={{mariginLeft:'60px',marginRight: '50px',color: 'white', backgroundColor: 'blue'}}>close</button>

                    </GooglePlacesSuggest>
                )
            }
        />
        </div>
        </div>
    )
}
}
 
class MapR extends React.Component {
    state = {
        values: [],
        redirect: false,
        showPopup:false
    }
     setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
     renderRedirect = () => {
      if (this.state.redirect) {
        
        return <Redirect to='/chart' />
      }
    }
     handleClick = () => {
      this.props.history.push("chart");
    }
    handleAdminClick = () => {
        this.props.history.push("admin/");
      }
     togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/webapp/regdata/')
         .then(res =>{
            this.setState({ values: res.data.regions });
         });
        }
     handlePost(){
         axios.post('http://127.0.0.1:8000/webapp/addReg/')
         .then(res =>{

         });
     }   
             
  render() {
    return <div className="drop-down" style={{marginTop: '0px',marginBottom: '275px',marginLeft: '150px',marginRight: '150px'}}>
    <p>Select a Region to View Prediction</p>
      <select style={{marginLeft: '10px'}}>{

         this.state.values.map((obj) => {
             return <option value={obj.id}>{obj.name}</option>
         })
      }</select>
        <button className="btn btn-default" onClick={this.handleClick} style={{marginLeft: '20px',color: 'white', backgroundColor: 'blue'}}>View Prediction</button>
        <button className="btn btn-default" onClick={this.togglePopup.bind(this)} style={{marginLeft: '100px',marginRight: '150px',color: 'white', backgroundColor: 'blue'}}>Add Region</button>
        {this.state.showPopup ? 
          <Popup
            text='Add Region'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
    </div>;
  }
}
 export default MapR;