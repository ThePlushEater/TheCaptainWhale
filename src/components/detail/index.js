import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

require('./index.scss');

import Timeline from "./../timeline";
import Post from "./../post";

@connect((store) => {
  return {
    localization: store.localization,
    browser: store.browser,
  }
})
export default class Detail extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    const { localization } = this.props.localization;
    return(
      <div className="detail" style={{
        backgroundPosition: "left -" + this.props.browser.scrollLeft + "px center",
      }}>
        <Post />
        <Timeline />
      </div>
    );
  }
}
