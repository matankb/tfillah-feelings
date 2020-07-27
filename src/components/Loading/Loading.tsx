import React from 'react';

import style from './loading.module.css'

const Loading = () => (
  <div className={style['loading-wrap']}>
    <i className="fa fa-spinner fa-spin" />
  </div>
)

export default Loading