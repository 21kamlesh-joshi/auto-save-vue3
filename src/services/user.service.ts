import {
  UserInterface
} from "../interfaces/user.interface";
import { Observable, from, map } from 'rxjs';
import { DB }  from '../firebase/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

export class UserService {
  constructor(
  ) {}

  /**
   * Fetch user Details
   * 
   */
  public getUserDetails(): Observable<UserInterface> {
    return from(getDoc(doc(DB, import.meta.env.VITE_FIREBASE_COLLECTION_NAME, import.meta.env.VITE_FIREBASE_COLLECTION_ID))).pipe(map((result: any) => result.data()));
  }


  /**
   * add/update 
   */

  public addUserDetails(user: UserInterface): Observable<UserInterface> {
    return from(setDoc(doc(DB, import.meta.env.VITE_FIREBASE_COLLECTION_NAME, import.meta.env.VITE_FIREBASE_COLLECTION_ID), user)).pipe(map(() => true));
  }

}
