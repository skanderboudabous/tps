import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from "firebase";
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser:BehaviorSubject<User> =new BehaviorSubject<User>(null);

  constructor(public afStore:AngularFirestore,public afAuth:AngularFireAuth) {
   afAuth.authState.subscribe((user)=>{
     if(user!=null){
       console.log(user.toJSON());
     }
   })
  }

  public login(email:string,password:string):ReturnType<firebase.auth.Auth["signInWithEmailAndPassword"]>{
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }
  public register(email:string,password:string): ReturnType<firebase.auth.Auth["createUserWithEmailAndPassword"]>{
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }
}
