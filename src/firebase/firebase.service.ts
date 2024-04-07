// firebase.service.ts
import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, getDoc, updateDoc, deleteDoc, setDoc, getDocs } from 'firebase/firestore';
import { config } from 'dotenv';

config(); // Load environment variables

@Injectable()
export class FirebaseService {
  private readonly app;
  public readonly auth;
  public readonly db;

  constructor() {
    this.app = initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'medicareai.firebaseapp.com',
      databaseURL: 'https://medicareai-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'medicareai',
      storageBucket: 'medicareai.appspot.com',
      messagingSenderId: '1071142761241',
      appId: '1:1071142761241:web:03538b5750d0f971f7cb88',
      measurementId: 'G-2040YCZZTH',
    });
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  async addDocument(collectionName: string, data: any, docId: string): Promise<void> {
    const docRef = doc(collection(this.db, collectionName), docId);
    await setDoc(docRef, data);
  }

  async getDocument(collectionName: string, docId: string): Promise<any> {
    const docRef = doc(this.db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async getAllDocuments(collectionName: string): Promise<any[]> {
    const querySnapshot = await getDocs(collection(this.db, collectionName));
    const documents = [];

    querySnapshot.forEach((doc) => {
      const doctorData = doc.data();
      documents.push({ id: doc.id, ...doctorData });
    });
    return documents;
  }

  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const docRef = doc(this.db, collectionName, docId);
    await updateDoc(docRef, data);
  }

  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.db, collectionName, docId);
    await deleteDoc(docRef);
  }
}
