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
        <SectionButton name="View Data" icon="fas fa-database" color="#4ed88b" linkTo="/data" />
      </div>

      <div className={style['explanation']}>
         This is a snapshot of the app from August 31, 2020 (for the "Powered by Sefaria" contest). 
        For the most updated version, please click 
        <a href="https://tfeeling.netlify.com" target="_blank" rel="noopener noreferrer"> here.</a>
      </div>

    </div>

    <footer>
      Created by Matan Kotler-Berkowitz &amp; powered by&nbsp;
      <a href="https://www.sefaria.org/" target="_blank" rel="noopener noreferrer">Sefaria</a>
    </footer>
  </div>
)

export default Home;