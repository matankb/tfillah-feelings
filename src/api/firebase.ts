import firebase from 'firebase/app';

import { Prayer, Feeling, Template } from 'src/types/types';

interface DocumentBase {
  id: string;
}

async function getCollectionDocuments<T extends DocumentBase>(collection: string) {
  const snapshot = await firebase.firestore().collection(collection).get();
  const documents: T[] = snapshot.docs.map(doc => ({
    ...doc.data() as T,
    id: doc.id
  }));
  return documents;
}

export function getAllPrayers() {
  return getCollectionDocuments<Prayer>('prayers');
}

export function addPrayer(prayer: Omit<Prayer, 'id'>) {
  firebase.firestore().collection('prayers').add(prayer); 
}

export function setPrayer(id: string, prayer: Prayer) {
  firebase.firestore().collection('prayers').doc(id).set(prayer);
}

export function getAllFeelings() {
  return getCollectionDocuments<Feeling>('feelings');
}

export function getAllTemplates() {
  return getCollectionDocuments<Template>('templates');
}

export async function getTemplate(id: string): Promise<Template> {
  const doc = await firebase.firestore().collection('templates').doc(id).get();
  return {
    ...doc.data() as Template,
    id: doc.id
  }
}