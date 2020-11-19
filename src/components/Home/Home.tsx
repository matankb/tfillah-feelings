import React from 'react';

import SectionButton from '../SectionButton/SectionButton';

import style from './home.module.css'

const Home = () => (
  <div className={style['home']}>

    <div>
      <h1 className={style['app-title']}>T'Feeling</h1>
      <div className={style['section-buttons']}>
        <SectionButton name="Check In" icon="fas fa-tasks" color="cornflowerblue" linkTo="/check-in" />
        <SectionButton name="Siddur" icon="fas fa-book-open" color="darkorange" linkTo="/siddur" />
        <SectionButton name="Rate Prayers" icon="fas fa-edit" color="#e26f6f" linkTo="/rate" />
      </div>

    </div>

    <footer>
      Created by Matan Kotler-Berkowitz &amp; powered by&nbsp;
      <a href="https://www.sefaria.org/" target="_blank" rel="noopener noreferrer">Sefaria</a>
    </footer>
  </div>
)

export default Home;
