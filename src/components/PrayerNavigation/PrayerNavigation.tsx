import React from 'react';
import classNames from 'classnames';

import style from './prayer-navigation.module.css'

interface PrayerNavigationProps {
  enableBack: boolean;
  enableNext: boolean;
  handleNext: () => void;
  handleBack: () => void;
};

const PrayerNavigation = (props: PrayerNavigationProps) => (
  <div className={style['nav-wrap']}>
    <span className={classNames(style['back'], !props.enableBack && style['disabled'])} onClick={props.handleBack}>
      <i className="fa fa-arrow-left"></i>
      Back
    </span>
    <span className={classNames(style['next'], !props.enableNext && style['disabled'])} onClick={props.handleNext}>
      Next
      <i className="fa fa-arrow-right"></i>
    </span>
  </div>
)

export default PrayerNavigation