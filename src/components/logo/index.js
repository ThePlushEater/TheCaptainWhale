import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
// import * as PIXI from 'pixi.js';
//
// import Canvas from './../canvas';
// import Content from './../content';

// import { fetchPosts, fetchComments } from "./../../actions/postsActions";

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    browser: store.browser,
    data: store.data,
  }
})
export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {
    // this.props.dispatch(fetchPosts());
    // this.props.dispatch(fetchComments());
  }
  componentDidMount() {
    const image = ReactDom.findDOMNode(this.refs['image']);
    this.setState({
      top: -Math.floor(image.height * 0.5),
    });
  }
  componentWillReceiveProps(nextProps) {
    const image = ReactDom.findDOMNode(this.refs['image']);
    this.setState({
      top: -Math.floor(image.height * 0.5),
    });
  }
  handleBackButton(event) {
    this.props.dispatch({type: "PUSH_ROUTE", payload: ""});
  }
  openAboutPost(event) {
    this.props.dispatch({type: "PUSH_ROUTE", payload: "about-whale"});
  }
  render() {
    const { localization } = this.props.localization;
    const { selectedPost } = this.props.data;
    let logo, instruction;
    if (this.props.browser.windowSize[0] >= 1440) {
      logo = <img ref="image" style={{
        top: this.state.top,
      }} src="./logo_wide.png" />;
      if (selectedPost) {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_detail_wide.png" />;
      } else {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_list_wide.png" />;
      }
    } else if (this.props.browser.windowSize[0] <= 414) {
      logo = <img ref="image" style={{
        top: this.state.top,
      }} src="./logo_portrait.png" />;
      if (selectedPost) {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_detail_portrait.png" />;
      } else {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_list_portrait.png" />;
      }
    } else {
      logo = <img ref="image" style={{
        top: this.state.top,
      }} src="./logo.png" />;
      if (selectedPost) {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_detail.png" />;
      } else {
        instruction = <img ref="image" style={{
          top: this.state.top,
        }} src="./instruction_list.png" />;
      }
    }

    if (selectedPost) {
      return(
        <div className="logo">
          { logo }
          { instruction }
          <div className="back" onClick={this.handleBackButton.bind(this)}>
          </div>
        </div>
      );
    } else {
      return(
        <div className="logo">
          { logo }
          { instruction }
          <div className="back" onClick={this.openAboutPost.bind(this)}>
          </div>
        </div>
      );
    }
  }
}
