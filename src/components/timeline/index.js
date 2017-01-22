import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import moment from 'moment';

import clientConfig from "./../../config/client";

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    data: store.data,
    browser: store.browser,
  }
})
export default class Timeline extends React.Component {
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
    const { allPosts } = this.props.data;

    let width = 0;
    if (allPosts.length > 0) {
      width = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * allPosts[allPosts.length - 1].position + Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3)) * 0.75;
    }

    const lines = allPosts.map((item, index) => {
      const left = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60 + 8;
      return (<div className="time" key={"time-" + index} style={{
          left: left - this.props.browser.scrollLeft,
        }}>
          { new moment(item.date).format(clientConfig.sTimelineFormat) }
        </div>);
    });

    return(
      <div className="timeline" style={{
        width: width,
      }}>
        { lines }
      </div>
    );
  }
}
