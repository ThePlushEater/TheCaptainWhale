import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import store from "./../../store";

// import * as PIXI from 'pixi.js';
//
// import Canvas from './../canvas';
// import Content from './../content';

import { fetchPosts } from "./../../actions/dataActions";

import Flow from './../flow';
import Fishing from './../fishing';

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    browser: store.browser,
  }
})
export default class List extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {
    this.props.dispatch(fetchPosts());
  }
  componentDidMount() {
    const list = ReactDom.findDOMNode(this.refs['list']);
    if (list) {
    	list.addEventListener("mousewheel", this.handleMouseWheel.bind(this, list), false);  // IE9, Chrome, Safari, Opera
    	list.addEventListener("DOMMouseScroll", this.handleMouseWheel.bind(this, list), false);  // Firefox
      list.addEventListener("scroll", this.handleScroll.bind(this, list), false);  // Firefox
    }

  }
  componentWillReceiveProps(nextProps) {

  }
  handleMouseWheel(list, event) {
    let e = window.event || event; // old IE support
    let delta = (e.wheelDelta || -e.detail);
    list.scrollLeft -= delta;
  }
  handleScroll(list, event) {
    this.props.dispatch({type: "UPDATE_LIST_SCROLL_LEFT", payload: list.scrollLeft});
  }
  render() {
    const { localization } = this.props.localization;
    return(
      <div id="post-list" ref="list" className="list" style={{
        backgroundPosition: "left -" + this.props.browser.scrollLeft + "px center",
      }}>
        <Fishing />
        <Flow type="program" />
        <Flow type="design" />
        <Flow type="art" />
      </div>
    );
  }
}
