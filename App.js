import App from './src/App';
import React, { Component } from 'react';
import { Provider } from 'react-redux'
export default class App extends Component {
    render() {
      return (
        <Provider store={store}>
          <div>
            <Person />
          </div>
        </Provider>
      );
    }
  }