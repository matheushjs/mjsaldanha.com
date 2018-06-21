import React, { Component } from "react";
import "./App.css";

import { Fade } from "react-slideshow-image";

const images = [
  "images/slideimage-gpucpu.png",
  "images/slideimage-linux.png",
  "images/slideimage-parallel.png",
];

class App extends Component {
  render() {
    return (
        <Fade
          images={images}
          duration={5000}
          transitionDuration={1000}
        />
    );
  }
}

export default App;
