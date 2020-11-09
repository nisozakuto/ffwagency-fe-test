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
                  {e.content_endpoint === "fonts_a" ? (
                    <article id="fonts-a">
                      {this.state.font_a.content ? (
                        this.state.font_a.content.map((e) => {
                          return <Cards info={e} />;
                        })
                      ) : (
                        <p></p>
                      )}
                    </article>
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
