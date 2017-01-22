import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

require('./index.scss');

@connect((store) => {
  return {

  }
})
export default class Copyright extends React.Component {
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
    return(
      <div className="copyright">
        © Captainwhale | 2017
      </div>
    );
  }
}
