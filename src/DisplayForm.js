import React, { Component } from 'react';

class DisplayForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    const city = document.getElementById('city-input').value
    this.props.onCitySubmit(city)
    this.props.onLocationSubmit(city)
    .then(result => {
      this.props.onWthrSubmit(result)
    }).catch(err => console.log('Error,', err))
  }

  render() {
    return(
      <div>
        <input type='text' id='city-input'></input>
        <button onClick={this.handleSubmit}>Get the weather</button>
      </div>
    )
  }
}

  export default DisplayForm
