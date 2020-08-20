import React, { useEffect, useState } from 'react';

import { PrayerData } from 'src/types/types';
import { getPrayerData } from 'src/api/sefaria';
import Loading from 'src/components/Loading/Loading';

import style from './prayer-display.module.css';

interface PrayerDisplayProps {
  prayerRef: string;
  color: string;
  message?: React.ReactNode;
  footerMessage?: React.ReactNode;
}

const PrayerDisplay = ({ prayerRef, message, color, footerMessage }: PrayerDisplayProps) => {

  const [prayerData, setPrayerData] = useState<PrayerData>();

  useEffect(() => {
    getPrayerData(prayerRef).then(setPrayerData);
  }, [prayerRef]);

  return (
    <div className={style['prayer']}>
      <div className={style['prayer-header']} style={{ backgroundColor: color }}>
        <div className={style['section-name']}>
          {prayerData?.section}
        </div>
        <div>
          { message }
        </div>
      </div>
      <div style={{ padding: 10 }}>
        <div className={style['prayer-title']}>
          {prayerData?.name || <Loading />}
        </div>
        <div className={style['prayer-text']}>
          <div 
            className={style.hebrew} 
            dangerouslySetInnerHTML={{ __html: prayerData?.hebrew || '' }}  
          />
          <div 
            className={style.english}
            dangerouslySetInnerHTML={{ __html: prayerData?.english || '' }}
          />
        </div>
      </div>
      <div className={style['prayer-footer']}>
        <a
          className={style['sefaria-link']}
          href={`https://www.sefaria.org/${prayerRef}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View on Sefaria
        </a>
        <div>
          {footerMessage}
        </div>
      </div>
    </div>
  )
}

export default PrayerDisplay;