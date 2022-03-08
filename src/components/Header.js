import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <nav className='navbar'>
        <NavLink className='link' activeClassName='link_active' to='/btc'>
          BNB Search
        </NavLink>
        <NavLink className='link' to='/'>
          <h1 className='logo'>Coin Wallet</h1>
        </NavLink>
        <NavLink className='link' activeClassName='link_active' to='/eth'>
          Ethereum Search
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
