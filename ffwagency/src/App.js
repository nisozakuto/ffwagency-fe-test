import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cards from "./components/Cards";
import "./App.css";

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
  // fetchTab(tabInfo) {
  //   fetch(`http://json.ffwagency.md/${tabInfo}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("tabinfo", tabInfo);
  //       if (tabInfo === "font_a") {
  //         this.setState({
  //           font_a: res,
  //         });
  //       } else if (tabInfo === "font_b") {
  //         this.setState({
  //           font_b: res,
  //         });
  //       }
  //       console.log(res);
  //     });
  // }

  render() {
    return (
      <section>
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
                    <article id="fonts-a">First Section</article>
                  ) : (
                    <article id="buy-fonts">
                      {this.state.font_b ? (
                        <p>{this.state.font_b.content}</p>
                      ) : (
                        <p>No data here</p>
                      )}{" "}
                    </article>
                  )}
                </TabPanel>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Tabs>
      </section>
    );
  }
}
