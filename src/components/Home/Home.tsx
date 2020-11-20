import React from 'react';

import SectionButton from '../SectionButton/SectionButton';

import style from './home.module.css'

const Home = () => (
  <div className={style['home']}>

    <div className={style['background']}>
      <h1 className={style['app-title']}>T'Feeling</h1>
      <div className={style['explanation']}>

      <div>Welcome to T'Feeling! T'Feeling is an app to explore the connections between <i>t'fillah</i> (prayer) and emotions.</div>
      <ul>
        <li>Check In: Using user-contributed data, T'feeling will take the emotions you want to be feeling and suggest t'fillot for you.</li>
        <li>Siddur: Browse all the responses that T'feeling users have given</li>
        <li>Rate Prayers: Contribute to T'feeling by telling us how you connect t'fillot and emotions. Your responses will help make T'feeling better for everybody!</li>
      </ul>
    </div>

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
