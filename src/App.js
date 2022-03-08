import { Route, Switch } from 'react-router-dom';
import BNBSearch from './components/BNBSearch';
import EthSearch from './components/EthSearch';
import Header from './components/Header';
import Coins from './components/Coins/Coins';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/btc'>
          <BNBSearch />
        </Route>
        <Route path='/eth'>
          <EthSearch />
        </Route>
        <Route path='*'>
          <Coins />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
