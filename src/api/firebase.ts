import firebase from 'firebase/app';

import { Prayer, Feeling, Template } from 'src/types/types';
import data from './data.json';

interface DocumentBase {
  id: string;
}

function tick() {
  return new Promise(res => setTimeout(res, 200));
}

async function getCollectionDocuments<T extends DocumentBase>(collection: string) {
  // const snapshot = await firebase.firestore().collection(collection).get();
  // const documents: T[] = snapshot.docs.map(doc => ({
  //   ...doc.data() as T,
  //   id: doc.id
  // }));
  // return documents;
  await tick();
  return (data as any)[collection] as T[];
}

 // @ts-ignore
global.getCollection = getCollectionDocuments;

export function getAllPrayers() {
  return getCollectionDocuments<Prayer>('prayers');
}

export async function addPrayer(prayer: Omit<Prayer, 'id'>) {
  await tick();
  // firebase.firestore().collection('prayers').add(prayer); 
}

export async function setPrayer(id: string, prayer: Prayer) {
  await tick();
  // firebase.firestore().collection('prayers').doc(id).set(prayer);
}

export function getAllFeelings() {
  return getCollectionDocuments<Feeling>('feelings');
}

export function getAllTemplates() {
  return getCollectionDocuments<Template>('templates');
}

export async function getTemplate(id: string): Promise<Template> {
  // const doc = await firebase.firestore().collection('templates').doc(id).get();
  // return {
  //   ...doc.data() as Template,
  //   id: doc.id
  // }
  await tick();
  return data.templates.find(template => template.id === id) as Template;
}