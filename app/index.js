import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
      </ul>
    </div>
  }
}

ReactDOM.render(<App/>, document.body.appendChild(document.createElement('div')));
