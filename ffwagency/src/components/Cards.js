import React, { Component } from "react";

export default class cards extends Component {
  render() {
    return (
      <article>
        {this.props.info ? (
          <ul>
            {console.log(this.props)}
            <button style={{backgroundColor : this.props.info.color}} className={(this.props.selectedItem === this.props.info.id) ? "halfOpacity" : "fullOpacity" } alt={this.props.info.color_blind_label} onClick={()=>{this.props.setSelectedItem(this.props.info.id)}}>{this.props.info.abbr} </button>
            <li>{this.props.info.label}</li>
          </ul>
        ) : (
          <p>Nothing here</p>
        )}
      </article>
    );
  }
}
