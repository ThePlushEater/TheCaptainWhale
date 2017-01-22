import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import Item from './item';

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    data: store.data,
    browser: store.browser,
  }
})
export default class Flow extends React.Component {
  constructor() {
    super();
    this.state = {
      top: 0,
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    const svg = ReactDom.findDOMNode(this.refs['svg']);
    if (svg) {
      this.setState({
        top: Math.floor(svg.clientHeight * 0.5),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const prevWindowSize = this.props.browser.windowSize;
    const nextWindowSize = nextProps.browser.windowSize;
    if (prevWindowSize[0] != nextWindowSize[0] || prevWindowSize[1] != nextWindowSize[1]) {
      const svg = ReactDom.findDOMNode(this.refs['svg']);
      if (svg) {
        this.setState({
          top: Math.floor(svg.clientHeight * 0.5),
        });
      }
    }
  }
  componentDidUpdate() {

  }
  render() {
    const { localization } = this.props.localization;
    const { allPosts } = this.props.data;
    const filteredPosts = allPosts.filter((item) => {
      if (item.acf.category == this.props.type) {
        return true;
      }
      return false;
    });
    const list = filteredPosts.map((item, index) => {
      return <Item key={"item-" + index} item={item} />;
    });


    // let width = 0;
    // if (allPosts.length > 0) {
    //   width = Math.max(400, Math.floor(this.props.browser.windowSize[0] / 3)) * allPosts[allPosts.length - 1].position;
    // }
    // const coords = {x1: 0, y1: this.state.top, x2: width, y2: this.state.top};
    // <svg ref="svg" style={{
    //   width: width,
    // }}>
    //   <line className="line" {...coords} stroke="#576b7d" strokeLinecap="round" />
    // </svg>
    
    return(
      <div className="flow">
        <div className="header">
          <div className="wrapper">
            <div>
              {this.props.type}
            </div>
          </div>
        </div>
        <div className="body">
          { list }
        </div>
      </div>
    );
  }
}
