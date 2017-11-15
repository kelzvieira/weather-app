import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props)

    this.getHeaderImg = this.getHeaderImg.bind(this)
  }

  getHeaderImg() {
      
  }
    // console.log(data.results[0].photos[0].photo_reference)
    // const headerContainer = document.querySelector(`.wthr-header`)
    // console.log(headerContainer)
    //console.log(document.querySelector(`.wthr-header`).class)
    //document.querySelector(`.wthr-header`).style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${encodeURI(this.props.city)})`

  render() {
    return(
      <div className='wthr-header'>
          <h1 className='wthr-title'>What's the Weather Like Right Now in {this.props.cityDisplayName} ({this.props.countryCode})?</h1>
          {this.getHeaderImg()}
      </div>
    )
  }

}

export default Header
