import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import store from "./../../store";

require('./item.scss');

@connect((store) => {
  return {
    browser: store.browser,
  }
})
export default class Item extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    const body = ReactDom.findDOMNode(this.refs['body']);
    if (body) {
      this.props.item.height = body.offsetTop + body.clientHeight;
      this.props.dispatch({type: "UPDATE_POST_HEIGHT"});
    }
  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate() {
    const body = ReactDom.findDOMNode(this.refs['body']);
    if (body) {
      this.props.item.height = body.offsetTop + body.clientHeight;
      this.props.dispatch({type: "UPDATE_POST_HEIGHT"});
    }
  }
  handlePostClick(item, event) {
    if (this.props.browser.showInstructionAbout) {
      this.props.dispatch({type: "SHOW_INSTRUCTION_ABOUT", payload: false});
    }
    this.props.dispatch({type: "PUSH_ROUTE", payload: item.title.rendered.toLowerCase().split(' ').join('-')});
  }
  render() {
    return(
      <div className="item" style={{
        width: Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3.5)),
        left: Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * this.props.item.position,
      }}>
        <div className="wrapper" onClick={this.handlePostClick.bind(this, this.props.item)}>
          <div className="header">
            {this.props.item.title.rendered}
          </div>
          <div ref="body" className="body">
            {this.props.item.acf.summary}
          </div>
        </div>

      </div>
    );
  }
}
