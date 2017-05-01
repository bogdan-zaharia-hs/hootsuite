import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

import xhr from 'xhr';

class App extends Component {

  state = {
      location: '',
      data: {}
  };

  fetchData = (evt) => {
      evt.preventDefault();
      var location = encodeURIComponent(this.state.location);
      var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
      var urlSuffix = '&APPID=7270636ef9799cbf3f36a77dab214397&units=metric';
      var url = urlPrefix + location + urlSuffix;
      var self = this;

      xhr({
          url: url
      }, function (err, data) {
          self.setState({
              data: JSON.parse(data.body)
          });
      });
  };

  changeLocation = (evt) => {
      this.setState({
          location: evt.target.value
      });
  };

  render() {
    var currentTemp = '-';
    var windSpeed = '-';
    var clouds = '-';
    var pressure = '-';
    var humidity = '-';

    if (this.state.data.list) currentTemp = this.state.data.list[0].main.temp;
    if (this.state.data.list) pressure = this.state.data.list[0].main.pressure;
    if (this.state.data.list) windSpeed = this.state.data.list[0].wind.speed;
    if (this.state.data.list) clouds = this.state.data.list[0].clouds.all;
    if (this.state.data.list) humidity = this.state.data.list[0].main.humidity;
    return (
        <div>
            <h1>Owly's Weather Report</h1>
            <form onSubmit={this.fetchData}>
                <label>Is it T-Shirt weather in
                    <input
                        placeholder={"City, Country"}
                        type="'text"
                        value={this.state.location}
                        onChange={this.changeLocation}
                    />
                </label>
            </form>
            <p className="temp-wrapper">
                <span className="temp">{ currentTemp }</span>
                <span className="temp-symbol">°C</span>
            </p>
            <p className="temp-wrapper">
                <span className="temp">{ pressure }</span>
                <span className="temp-symbol">hpa</span>
            </p>
            <p className="temp-wrapper">
                <span className="temp">{ windSpeed }</span>
                <span className="temp-symbol">m/s</span>
            </p>
            <p className="temp-wrapper">
                <span className="temp">{ humidity }</span>
                <span className="temp-symbol">%</span>
            </p>
            <p className="temp-wrapper">
                <span className="temp">{ clouds }</span>
                <span className="temp-symbol">%</span>
            </p>
            {currentTemp > 15 && windSpeed < 5 && clouds < 30 &&
            <h1>
                !!! It's T-Shirt time !!!
                Grab yourself one of my sweet Owly shirts.
                <img src={logo} className="App-logo" alt="logo"/>
                <img src={logo} className="App-logo2" alt="logo"/>
            </h1>
            }
        </div>
    );
  }
}

export default App;
