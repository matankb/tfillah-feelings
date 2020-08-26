import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.png';
import style from './header.module.css'

const Header = () => (
  <header className={style['header']}>
    <Link to="/" className={style['home-link']}>
      <img src={logo} className={style['logo']} alt="" />
      T'Feeling
    </Link>
  </header>
)

export default Header