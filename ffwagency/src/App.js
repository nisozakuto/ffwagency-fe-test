import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cards from "./components/Cards";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [],
      font_a: [],
      font_b: [],
    };
  }
  componentDidMount() {
    this.fetchTabs();
  }

  handleSelect = (id) => {
    console.log("Handle Select ID _++++++", id);
    {
      if (id === "fonts_a") {
        fetch(`http://json.ffwagency.md/${id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              font_a: res,
            });
          });
      }
      if (id === "fonts_b") {
        fetch(`http://json.ffwagency.md/${id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              font_b: res,
            });
          });
      }
    }
  };

  fetchTabs() {
    fetch(`http://json.ffwagency.md/tabs`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((tabsRes) => {
        this.setState({ tabs: tabsRes });
      });
  }

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            {this.state.tabs.length > 0 ? (
              this.state.tabs.map((e) => {
                return (
                  <Tab
                    onClick={this.handleSelect.bind(this, e.content_endpoint)}
                  >
                    {e.label}
                  </Tab>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </TabList>
          {this.state.tabs.length > 0 ? (
            this.state.tabs.map((e) => {
              return (
                <TabPanel>
                  <h2>{e.content_endpoint}</h2>
                  {e.content_endpoint === "fonts_a" ? (
                    <section id="font-a">First Section</section>
                  ) : (
                    <section id="font-b">
                      {this.state.font_b ? (
                        <p>{this.state.font_b.content}</p>
                      ) : (
                        <p>No data here</p>
                      )}{" "}
                    </section>
                  )}
                </TabPanel>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Tabs>
      </div>
    );
  }
}
