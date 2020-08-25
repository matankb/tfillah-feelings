import React from 'react';

import SectionButton from '../SectionButton/SectionButton';

import style from './home.module.css'

const Home = () => {
  return (
    <div className={style['home-wrap']}>
      <h1>T'Feeling</h1>
      <div className={style['section-buttons']}>
        <SectionButton name="Check In" icon="fas fa-tasks" color="cornflowerblue" linkTo="/check-in" />
        <SectionButton name="Siddur" icon="fas fa-book-open" color="darkorange" linkTo="/siddur" />
        <SectionButton name="Rate Prayers" icon="fas fa-edit" color="#e26f6f" linkTo="/rate" />
        <SectionButton name="View Data" icon="fas fa-database" color="#4ed88b" linkTo="/data" />
      </div>
    </div>
  )
}

export default Home;