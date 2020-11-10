import React, { Component } from "react";

export default class cards extends Component {
  render() {
    return (
      <article>
        {this.props.info ? (
          <ul onClick={this.props.onToggle}>
            {console.log(this.props)}
            <button alt={this.props.info.color_blind_label} onClick={()=>{this.props.SelectedItem(this.props.info.id)}}>{this.props.info.abbr} </button>
            <li>{this.props.info.label}</li>
          </ul>
        ) : (
          <p>Nothing here</p>
        )}
      </article>
    );
  }
}
