import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import * as d3 from 'd3';

require('./index.scss');

@connect((store) => {
  return {
    data: store.data,
    browser: store.browser,
  }
})
export default class Fishing extends React.Component {
  constructor() {
    super();
    this.state = {
      top: 0,
      middle: 0,
      bottom: 0,
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    const height = document.querySelector('.app').clientHeight;
    this.setState({
      top: 80,
      middle: Math.floor(80 + (height * 0.5 - 80 - 24) * 0.33),
      bottom: Math.floor(80 + (height * 0.5 - 80 - 24) * 0.66),
    });
  }
  componentWillReceiveProps(nextProps) {
    const prevWindowSize = this.props.browser.windowSize;
    const nextWindowSize = nextProps.browser.windowSize;
    if (prevWindowSize[0] != nextWindowSize[0] || prevWindowSize[1] != nextWindowSize[1]) {
      const height = document.querySelector('.app').clientHeight;
      this.setState({
        top: 80,
        middle: Math.floor(80 + (height * 0.5 - 80 - 24) * 0.33),
        bottom: Math.floor(80 + (height * 0.5 - 80 - 24) * 0.66),
      });
    }
  }
  componentDidUpdate() {

  }
  render() {
    const { allPosts } = this.props.data;
    let width = 0;
    if (allPosts.length > 0) {
      width = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * allPosts[allPosts.length - 1].position + Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3)) * 0.75;
    }

    const lines = allPosts.map((item, index) => {
      const x = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60;
      let coords;
      switch(item.acf.category) {
        case "program": {
          coords = {x1: x, y1: 0, x2: x, y2: this.state.top + item.height};
          break;
        }
        case "design": {
          coords = {x1: x, y1: 0, x2: x, y2: this.state.middle + item.height};
          break;
        }
        case "art": {
          coords = {x1: x, y1: 0, x2: x, y2: this.state.bottom + item.height};
          break;
        }
      }
      return <line className="line" key={"line-" + index} {...coords} stroke="#211e34" strokeLinecap="round" />
    });

    const shadows = allPosts.map((item, index) => {
      const x = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60;
      let coords;
      switch(item.acf.category) {
        case "program": {
          coords = {x1: x + 1, y1: 0 + 1, x2: x + 1, y2: this.state.top + item.height + 1};
          break;
        }
        case "design": {
          coords = {x1: x + 1, y1: 0 + 1, x2: x + 1, y2: this.state.middle + item.height + 1};
          break;
        }
        case "art": {
          coords = {x1: x + 1, y1: 0 + 1, x2: x + 1, y2: this.state.bottom + item.height + 1};
          break;
        }
      }
      return <line className="line" key={"line-" + index} {...coords} stroke="rgba(0, 0, 0, 0.75)" strokeLinecap="round" />
    });

    const programPosts = allPosts.filter((item) => {
      if (item.acf.category == "program") {
        return true;
      }
      return false;
    });
    const designPosts = allPosts.filter((item) => {
      if (item.acf.category == "design") {
        return true;
      }
      return false;
    });
    const artPosts = allPosts.filter((item) => {
      if (item.acf.category == "art") {
        return true;
      }
      return false;
    });

    const height = this.state.middle - this.state.top;
    const programLineData = programPosts.map((item, index) => {
      const x = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60 + Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3.5)) * 0.5;
      const y = this.state.top + item.graphValue * height;
      return {"x": x, "y": y};
    });
    programLineData.unshift({"x": 60, "y": this.state.top + height / 2});
    programLineData.push({"x": width, "y": this.state.top + height / 2});
    const designLineData = designPosts.map((item, index) => {
      const x = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60 + Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3.5)) * 0.5;
      const y = this.state.middle + item.graphValue * height;
      return {"x": x, "y": y};
    });
    designLineData.unshift({"x": 60, "y": this.state.middle + height / 2});
    designLineData.push({"x": width, "y": this.state.middle + height / 2});
    const artLineData = artPosts.map((item, index) => {
      const x = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * item.position + 60 + Math.max(320, Math.floor(this.props.browser.windowSize[0] / 3.5)) * 0.5;
      const y = this.state.bottom + item.graphValue * height;
      return {"x": x, "y": y};
    });
    artLineData.unshift({"x": 60, "y": this.state.bottom + height / 2});
    artLineData.push({"x": width, "y": this.state.bottom + height / 2});

    var lineFunction = d3.line().curve(d3.curveBasis).x(function(d) { return d.x; }).y(function(d) { return d.y; });

    const graphs = [];

    graphs.push(<path key={"graph-1"} className="graph" d={lineFunction(programLineData)} fill="none" stroke="rgba(215, 215, 215, 0.25)" strokeLinecap="butt" />);
    graphs.push(<path key={"graph-2"} className="graph" d={lineFunction(designLineData)} fill="none" stroke="rgba(215, 215, 215, 0.25)" strokeLinecap="butt" />);
    graphs.push(<path key={"graph-3"} className="graph" d={lineFunction(artLineData)} fill="none" stroke="rgba(215, 215, 215, 0.25)" strokeLinecap="butt" />);

    return(
      <svg style={{
        width: width,
      }}>
        { graphs }
        { shadows }
        { lines }
      </svg>
    );
  }
}
