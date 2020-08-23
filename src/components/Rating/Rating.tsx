import React, { useState, useEffect } from 'react';

import { getAllTemplates } from 'src/api/firebase';
import { Template } from 'src/types/types';

import Loading from '../Loading/Loading';
import Templates from './Templates';
import SourceSheetInput from './SourceSheetInput';

import style from './rating.module.css'

const Rating = () => {

  const [templates, setTemplates] = useState<Template[]>();

  useEffect(() => {
    getAllTemplates().then(setTemplates);
  }, [])

  if (!templates) {
    return <Loading />;
  }

  return (
    <div className={style['rating-wrap']}>
      <h1>Rate Prayers</h1>

      <div className={style['rating-home']}>
        <div>
          <h3>Chose where to start</h3>
          <Templates templates={templates} />
        </div>
        <SourceSheetInput />
      </div>
    </div>
  )
}

export default Rating;