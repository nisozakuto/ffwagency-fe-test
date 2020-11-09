import React, { Component } from "react";

export default class cards extends Component {
  render() {
    return (
      <aside>
        {console.log("e", this.props.info)}
        {this.props.info ? (
          <ul>
            <li>{this.props.info.abbr}</li>
            <li>{this.props.info.color}</li>
            <li>{this.props.info.label}</li>
          </ul>
        ) : (
          <p>Nothing here</p>
        )}
      </aside>
    );
  }
}
