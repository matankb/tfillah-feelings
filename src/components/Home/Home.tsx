import React from 'react';

import style from './home.module.css'
import { Link } from 'react-router-dom';

interface SectionButtonProps {
  name: string;
  icon: string;
  color: string;
  linkTo: string;
}

const SectionButton = (props: SectionButtonProps) => (
  <Link to={props.linkTo} className={style['section-button-link']}>
    <div className={style['section-button']}>
      <i className={props.icon} style={{ color: props.color }} />
      <div className={style['section-title']}>
        {props.name}
      </div>
    </div>
  </Link>
)

const Home = () => {
  return (
    <div className={style['home-wrap']}>
      <h1>T'fillah Feelings App</h1>
      <div className={style['section-buttons']}>
        <SectionButton name="Check In" icon="fas fa-tasks" color="cornflowerblue" linkTo="/check-in" />
        <SectionButton name="Shacharit" icon="fas fa-book-open" color="darkorange" linkTo="/siddur" />
        {/* <SectionButton name="My Feelings" icon="fa fa-smile" color="#4ed88b" linkTo="/my-feelings" /> */}
        <SectionButton name="View Data" icon="fas fa-database" color="#4ed88b" linkTo="/data" />
      </div>
    </div>
  )
}

export default Home;