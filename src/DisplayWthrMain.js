import React, { Component } from 'react';

class DisplayWthrMain extends Component {
  constructor(props) {
    super(props)

    this.displayWthr = this.displayWthr.bind(this)
  }

  displayWthr(){
    if (this.props.state.loadingLatlng) {
      return <div>Loading ...</div>
    }
    if (!this.props.state.loadingLatlng && this.props.state.hasLatlng) {
      return (
        <div className="App-intro">
          <div>Current Temparature: {Math.round(this.props.state.wthr.temp - 273.15)}°C</div>
          <div>Min. Temparature: {Math.round(this.props.state.wthr.temp_min - 273.15)}°C</div>
          <div>Max. Temparature: {Math.round(this.props.state.wthr.temp_max - 273.15)}°C</div>
          <div>Weather: {this.props.state.descwthr}</div>
          <div>Humidity: {this.props.state.wthr.humidity}%</div>
        </div>
      )
    }
    // don't need an else statement because a return stops the function
    return <div>Something's gone wrong</div>
  }

  render() {
    return(
      <div>
        {this.displayWthr()}
      </div>
    )
  }

}

export default DisplayWthrMain
