import React, { useState } from 'react';
import classNames from 'classnames';

import style from './rating.module.css'
import { Link, useHistory } from 'react-router-dom';

function parseSheetId(url: string) {
  const match = url.match(/sefaria.org\/sheets\/(\d+)/);
  return match && match[1];
}

const SourceSheetInput = () => {

  const history = useHistory();
  const [sheet, setSheet] = useState('');

  const sheetId = parseSheetId(sheet);

  const handleInputKeydown = (e: React.KeyboardEvent) => {
    if (sheetId && e.key === 'Enter') {
      const sheetId = parseSheetId(sheet);
      history.push(`/rate/form?sheet=${sheetId}`);
    }
  }

  return (
    <div className={style['source-sheet']}>

      <h3>Or use a Sefaria Source Sheet</h3>

      <div className={style['source-sheet-input-wrap']}>
        <input
          placeholder="Sefaria URL"
          value={sheet}
          onChange={e => setSheet(e.target.value)}
          onKeyDown={handleInputKeydown}
          className={style['source-sheet-input']}
        />
        <Link to={`/rate/form?sheet=${sheetId}`}>
          <button className={classNames(sheetId && style['enabled'])}>
            <i className="fa fa-arrow-right" />
          </button>
        </Link>
      </div>

    </div>
  )
}

export default SourceSheetInput;