import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import { WindowResizeListener } from 'react-window-resize-listener';

import serverConfig from "./../../config/server";

import Logo from "./../logo";
import List from "./../list";
import Detail from "./../detail";
import Copyright from "./../copyright";

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    data: store.data,
  }
})
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.props.dispatch({type: "SET_ROUTER", payload: {router: this.props.router, route: this.props.location.pathname.replace("/", "")}});
    // this.props.dispatch({type: "PUSH_ROUTE", payload: this.props.location.pathname.replace("/", "")});
  }
  componentWillReceiveProps(nextProps) {

  }
  handleWindowResize(nextWindowSize) {
    this.props.dispatch({type: "SET_WINDOW_SIZE", payload: [nextWindowSize.windowWidth, nextWindowSize.windowHeight]});
    setTimeout(function() {
      document.querySelector('#post-list').scrollLeft += 1;
    }.bind(this), 100);
  }
  moveToEarthSite(event) {
    window.location = serverConfig.uEarthSite;
  }
  render() {
    let topActive = "";
    if (this.props.data.selectedPost != null) {
      topActive = " topactive";
    }
    let loaderActive = "";
    if (this.props.data.allPosts.length > 0) {
      loaderActive = " active";
    }
    return(
      <div className={"app" + topActive}>
        <WindowResizeListener onResize={this.handleWindowResize.bind(this)} />
        <Detail/>
        <Logo />
        <List/>
        <Copyright />
        <div className="earth" onClick={this.moveToEarthSite.bind(this)}>
          <img className="icon" src="./whale_earth_icon.png" />
          <img src="./whale_earth_text.png" />
        </div>
        <div className={"loader" + loaderActive}>
          <img src="./loader.jpg" />
        </div>
      </div>
    );
  }
}
