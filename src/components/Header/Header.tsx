import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import style from './header.module.css'

const Header = () => (
  <header className={style['header']}>
    <Link to="/" className={style['home-link']}>
      <i className={classNames('far fa-frown', style['logo-frown'])} />
      <i className={classNames('fas fa-smile', style['logo-smile'])} />
      Kavanapp
    </Link>
  </header>
)

export default Header