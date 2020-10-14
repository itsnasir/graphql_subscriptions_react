import React, { Component } from 'react'

class LiveStreaming extends Component {
  render() {
    return (
      <div className='link-container'>
          <div>
            {this.props.link.id}
          </div>
          <a href={this.props.link.url} target='_blank' rel='noopener noreferrer'>
            {this.props.link.url}
          </a>
      </div>
    )
  }
}

export default LiveStreaming
