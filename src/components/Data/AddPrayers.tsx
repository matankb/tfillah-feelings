import React, { useState } from 'react';
import firebase from 'firebase/app';

import style from './data.module.css'
import { Prayer, Feeling } from 'src/types/types';

const refs = [
  null, // "timestamp"
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Baruch SheAmar`,
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Ashrei`,
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Psalm 148`,
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Psalm 150`,
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Az Yashir`,
  `Siddur Ashkenaz, Weekday, Shacharit, Pesukei D'Zimra, Yishtabach`,
  `Siddur Ashkenaz, Weekday, Shacharit, Blessings of the Shema, Barchu`,
  `Siddur Ashkenaz, Weekday, Shacharit, Blessings of the Shema, Second Blessing before Shema`,
  `Siddur Ashkenaz, Weekday, Shacharit, Blessings of the Shema, Shema`,
  null, // veahavta
  null, // veahavta, again
  null, // vehaya
  null, // vayomer
  null, // Rock of Israel
  `Siddur Ashkenaz, Weekday, Shacharit, Amidah, Patriarchs`,
  null, // oseh shalom
  `Siddur Ashkenaz, Weekday, Shacharit, Concluding Prayers, Alenu`,
]

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


interface ParsedData {
  [ref: string]: string[][]
}

function parseDataFile(data: string) {
  const [prayerNames, ...rows] = data.split('\n').map(row => row.split(','));
  const prayers: ParsedData = {};
  for (let i = 0; i < prayerNames.length; i++) {
    const ref = refs[i];
    if (!ref) {
      if (ref !== null) {
        console.log('out of bounds...', i);
      }
      continue;
    }
    prayers[ref] = rows.map(row => row[i].split('|').map(f => f.trim()));
  }
  return prayers;
}

function addPrayers(files: FileList | undefined, feelings: Feeling[]) {
  if (!files) return;
  const reader = new FileReader();
  reader.addEventListener('load', e => {
    if (!e.target || typeof e.target.result !== 'string') return;
    const data = parseDataFile(e.target.result);
    const collection = firebase.firestore().collection('prayers');
    for (const ref in data) {
      const responses = data[ref]
        .flat()
        .filter(feelingName => !!feelings.find(f => f.name.toLowerCase() === feelingName.toLowerCase()))
        .map(feelingName => {
          const feeling = feelings.find(f => f.name.toLowerCase() === feelingName.toLowerCase());
          if (!feeling) {
            throw `Can't find feeling ${feelingName}`;
          }
          return {
            feeling: feeling.id,
            age: getRandomInt(15, 70),
          }
        })
      const newPrayer = {
        ref,
        responses,
      };
      collection.add(newPrayer)
    }
  })
  reader.readAsText(files[0]);
}

const AddPrayers = ({ feelings }: { feelings: Feeling[] }) => {

  const [files, setFiles] = useState<FileList>();

  return (
    <div>
      Add new data (ensure connected answer is formatted, and commas are replaced with |):
      <label>
        <input 
          type="file" 
          accept=".csv" 
          onChange={e => setFiles(e.target.files || undefined)}
        />
      </label>
      <button onClick={() => {addPrayers(files || undefined, feelings);setFiles(undefined)}}>Upload!</button>
    </div>
  )
}

export default AddPrayers