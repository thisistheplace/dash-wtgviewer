import React from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

/**
 * Loader wheel (js spinner)
 */
export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div id="loader">
        <div className="sweet-loading">
            <FadeLoader css={override} size={100} color={"#123abc"} loading={this.state.loading} speedMultiplier={1.0} />
        </div>
      </div>
    );
  }
}