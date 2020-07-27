import firebase from 'firebase/app';

import { Prayer, Feeling } from 'src/types/types';

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

export function getAllFeelings() {
  return getCollectionDocuments<Feeling>('feelings');
}