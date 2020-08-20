import React from 'react';

import SectionButton from '../SectionButton/SectionButton';

import style from './home.module.css'

const Home = () => {
  return (
    <div className={style['home-wrap']}>
      <h1>Kavanapp</h1>
      <div className={style['section-buttons']}>
        <SectionButton name="Check In" icon="fas fa-tasks" color="cornflowerblue" linkTo="/check-in" />
        <SectionButton name="Shacharit" icon="fas fa-book-open" color="darkorange" linkTo="/siddur" />
        <SectionButton name="View Data" icon="fas fa-database" color="#4ed88b" linkTo="/data" />
      </div>
    </div>
  )
}

export default Home;