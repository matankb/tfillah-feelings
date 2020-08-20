import React from 'react';
import { Link } from 'react-router-dom';

import style from './section-button.module.css'
console.log(style);

interface SectionButtonProps {
  name: string;
  icon: string;
  color: string;
  linkTo: string;
}

const SectionButton = (props: SectionButtonProps) => (
  <Link to={props.linkTo} className={style['section-button']}>
    <i className={props.icon} style={{ color: props.color }} />
    <div className={style['section-title']}>
      {props.name}
    </div>
  </Link>
)

export default SectionButton