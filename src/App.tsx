import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from 'routes/index';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <div className="app">
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Switch>
          </Suspense>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
