import React, { useState } from 'react';
import firebase from 'firebase/app';

import style from './data.module.css'

function addFeeling(name: string, emoji: string, color: string) {
  firebase.firestore().collection('feelings').add({
    name,
    emoji,
    color
  });
}

const AddFeeling = () => {

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [color, setColor] = useState('');

  return (
    <div>
      <input 
        placeholder="Feeling Name" 
        value={name}
        onChange={e => setName(e.target.value)} 
      />
      <input 
        placeholder="Emoji" 
        value={emoji}
        onChange={e => setEmoji(e.target.value)} 
      />
      <div style={{width:10,height:10,background:color,display:'inline-block'}} />
      <input 
        placeholder="Color"
        value={color}
        onChange={e => setColor(e.target.value)} 
      />
      <button
        onClick={() => {
          addFeeling(name, emoji, color);
          setName('');
          setEmoji('');
          setColor('');
        }}
      >
        Add
      </button>
    </div>
  )
}

export default AddFeeling