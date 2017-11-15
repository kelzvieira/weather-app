import React, { Component } from 'react';

class DisplayWthrForecast extends Component {
  constructor(props) {
    super(props)

    this.getDaysOfWeek = this.getDaysOfWeek.bind(this)
    this.getForecast = this.getForecast.bind(this)
  }

  getForecast(location) {
    console.log(location)
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=72af66db614bf9fd03583352142dd7a7`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== "200") {
        console.log(data)
        throw new Error('could not get the weather forecast')
      } else {
        console.log(data)
        console.log(data.list)
        return data.list
      }
    })
    .catch(err => console.log('Error,', err))
  }

  getDaysOfWeek() {
    const today = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const tomorrow = weekday[today.getDay()+1].substring(0,3);
    const dayAfterTomorrow = weekday[today.getDay()+2].substring(0,3);
    const dayAfterDayAfterTomorrow = weekday[today.getDay()+3].substring(0,3);
    const thisWeek = [tomorrow,dayAfterTomorrow,dayAfterDayAfterTomorrow];
    return thisWeek
  }

  render() {
    return(
      <div>
        <div>
          <div>{this.getDaysOfWeek()[0]}: {this.getForecast(this.props.forecast)}°C</div>
          <div>{this.getDaysOfWeek()[1]}: °C</div>
          <div>{this.getDaysOfWeek()[2]}: °C</div>
        </div>
      </div>
    )
  }

}

  export default DisplayWthrForecast
