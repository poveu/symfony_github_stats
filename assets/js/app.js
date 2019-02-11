import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MainView from './components/MainView'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={MainView} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));