import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hello from '@/client/pages/Hello';
import Home from '@/client/pages/Home';
import About from '@/client/pages/About';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
