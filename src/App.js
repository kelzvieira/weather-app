import React, { Component } from 'react';
import './App.css';
import DisplayForm from './DisplayForm.js';
import DisplayWthrMain from './DisplayWthrMain.js';
import DisplayWthrForecast from './DisplayWthrForecast.js';
import Header from './Header.js';

/* Requirements

Get sydneys lat and lng.
Use this url: https://maps.googleapis.com/maps/api/geocode/json?address=${city}
change city to the city you want to search ('sydney')
try using a function and passing in the city.
Get the current temperature for Sydney's latitude and longitude
Use this url: http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=72af66db614bf9fd03583352142dd7a7
change lat and lng so that it matches sydney's lat and long
try using a function and passing in the lat and lng so you can use other cities too
Convert the temperature from kelvin to degrees celsius
Add a form that allows a user to search for any city's weather and logs out the result.
Display the result of the users search.
Display the type of weather too (cloudy, sunny, etc -- check the response)
Bonus

Add a loading indicator until you're ready to display the information for the city.
Make it pretty, ideas:
Change the background of the page to reflect the temperature
Add pictures to represent the type of weather -- clouds, the sun, etc. - maybe change BGs
Request a new temperature every few minutes (hint: setInterval)
Animate when the weather changes. */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingLatlng: false,
      hasLatlng: false,
      latlng: {},
      loadingWthr: false,
      hasWthr: false,
      descWthr: '',
      forecastWthr: [],
      wthr: {},
      country: 'AU',
      city: 'Sydney',
      cityDisplayName: 'City of Sydney',
      // ideally you'd use the location of the device to fill in this value
      // for the initial load of the App
      // but since we're in GA Sydney, I figured this was a good bet to start with
      headerURL: '',
    }

    this.getLatLng = this.getLatLng.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.getDayPart = this.getDayPart.bind(this)
    this.getCity = this.getCity.bind(this)
    this.getForecast = this.getForecast.bind(this)
  }

  getWeather(result) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lng}&APPID=72af66db614bf9fd03583352142dd7a7`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        console.log(data)
        this.setState({
        loadingLatlng: false,
        hasLatlng: false
        })
        throw new Error('Did not get the weather')
      } else {
        this.setState({
          loadingWthr: false,
          wthr: data.main,
          descWthr: data.weather[0].main,
          hasWthr: true,
          country: data.sys.country,
          cityDisplayName: data.name,
        })
        this.getForecast(result)
        console.log(data.weather)
        return data
      }
    })
  }

  getForecast(result) {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${result.lat}&lon=${result.lng}&appid=72af66db614bf9fd03583352142dd7a7`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== "200") {
        console.log(data)
        throw new Error('could not get the weather forecast')
      } else {
        this.setState({
          forecastWthr: data.list,
        })
        console.log(data)
        console.log(this.state.forecastWthr[0].main)
        return data.list
      }
    })
    .catch(err => console.log('Error,', err))
  }

  getDayPart(sunrise, sunset) {

  }

  getLatLng(city) {
    this.setState({
      loadingLatlng: true
    })

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.status !== 'OK') {
        console.log(data)
        this.setState({
        loadingLatlng: false,
        hasLatlng: false
        })
        throw new Error('could not get the latitude and logitude of your city')
      } else {
        this.setState({
          loadingLatlng: false,
          latlng: data.results[0].geometry.location,
          hasLatlng: true
        })
        return data.results[0].geometry.location
      }
    })
  }

  getCity(city){
    const userCity = city
      // .toLowerCase(txt => {
      // txt.length[0].toUpperCase
     // })
    this.setState({
      city: userCity,
    })
    this.getLatLng(userCity)
    .then(result => this.getWeather(result))
    .catch(err => console.log('Error,', err))
    return userCity
  }

    // this method runs only once the component mounts, once
    // called a lifecycle hook
  componentDidMount() {
    // need to work out how to get the city from input into componentDidMount
        this.getLatLng(this.state.city)
            .then(result => this.getWeather(result))
            .catch(err => console.log('Error,', err))
  }

  render() {
    return (
      <div className="App">
        <Header cityDisplayName={this.state.cityDisplayName} city={this.state.city} countryCode={this.state.country} location={this.state.latlng}/>
        <DisplayForm onCitySubmit={this.getCity} onLocationSubmit= {this.getLatLng} onWthrSubmit={this.getWeather} onFrcstSubmit={this.getForecast}/>
        <DisplayWthrMain state={this.state} />
        {/*}<DisplayWthrForecast location={this.state.latlng} />*/}
      </div>
    );
  }
}

export default App;
