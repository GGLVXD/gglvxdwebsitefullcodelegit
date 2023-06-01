import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routes = [
  '/',
  '/friends/potatolutz.html',
  '/endercraft',
  '/sitemaps.xml',
  '/robots.txt',
  '/css',
  '/img',
  '/googlecba8dce2c35e487c.html',
  '/maxcraft',
  '/minecraft',
  '/skins'
];

const IframeRoute = ({ route }) => {
  return (
    <iframe
      src={`http://n7.danbot.host:1629${route}`}
      title={route}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} exact path={route}>
            <IframeRoute route={route} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
