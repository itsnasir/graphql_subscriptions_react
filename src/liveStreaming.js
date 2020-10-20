import React, { Component } from 'react';

class LiveStreaming extends Component {
  detailPage = id => {
    this.props.history.push(`/comments/${id}`, { id });
  };

  render() {
    return (
      <div className='link-container'>
        <div>
          <span
            onClick={() => this.detailPage(this.props.link.id)}
            style={{ cursor: 'pointer' }}
          >
            {this.props.link.id}
          </span>
        </div>
        <a href={this.props.link.url} target='_blank' rel='noopener noreferrer'>
          {this.props.link.url}
        </a>
      </div>
    );
  }
}

export default LiveStreaming;
