import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// import { ReactComponent as Logo } from './logo.svg';
import logo from './logo.png';
import style from './header.module.css'


const Header = () => (
  <header className={style['header']}>
    <Link to="/" className={style['home-link']}>
      Kavanapp
      {/* <i className={classNames('far fa-frown', style['logo-frown'])} />
      <i className={classNames('fas fa-smile', style['logo-smile'])} /> */}
      {/* <Logo className={style['logo']} color="white" /> */}
      <img src={logo} className={style['logo']} alt="" />
    </Link>
  </header>
)

export default Header