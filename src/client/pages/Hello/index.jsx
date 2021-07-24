import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject((store) => {
  return {
    globalStore: store.globalStore,
  };
})
@observer
class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          className="Hello"
          onClick={() => {
            this.props.globalStore.toggle();
          }}
        >
          Hello
        </div>
        <h1>{this.props.globalStore.count}</h1>
        <div className="Hello">
          <Link to="/home">home</Link>
          <Link to="/about">about</Link>
        </div>
      </div>
    );
  }
}

export default Hello;
