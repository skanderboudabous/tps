import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable,} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {User} from '../../Models/User/user';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccessToken} from '../../Models/Token/access-token';
import {RouteInfo} from '../../Components/admin/sidebar/sidebar.component';

const API = environment.apiUrl + 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public ROUTES: BehaviorSubject<RouteInfo[]> = new BehaviorSubject<RouteInfo[]>([]);
  constructor(public httpClient: HttpClient, private matSnackBar: MatSnackBar,private router:Router) {
    let dateNow = new Date();
    if(localStorage.getItem("token")!=null){
      let token:AccessToken = JSON.parse(localStorage.getItem('token'));
      let tokenDate=new Date(token.created);
      let days=this.numberOfDays(dateNow,tokenDate);
      if(days <1){
        this.getUser(token.id).subscribe((user)=>{
          this.currentUser.next(user);
          this.initRoutes(token.role);
        })
      } else{
        this.router.navigate(['/login']);
      }

    }
  }


  public  login(email: string, password: string) {
    this.httpClient.get<User>(`${API}/login?email=${email}&password=${password}`).subscribe(async (user) => {
      if (user == null) {
        this.matSnackBar.open('Informations erronées', '', {
          duration: 2000,
        });
      } else {
        this.initRoutes(user);
        this.setToken(user);
        this.currentUser.next(user);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  public initRoutes(role){
    console.log(role);
    this.ROUTES.next(role == 'Caissié' ?
      [
        {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
        {path: '/list-colis-recu', title: 'List Colis Recu', icon: 'person', class: ''},
        {path: '/import-colis-recu', title: 'Import Colis', icon: 'content_paste', class: ''},
      ] :
      [
        {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
        {path: '/list-colis-exp', title: 'List Colis Exporte', icon: 'person', class: ''},
        {path: '/add-colis-exp', title: 'Ajouter une Colis', icon: 'content_paste', class: ''}
      ]);
  }

  public setToken(user:User){
    let token={
      "id":user.id,
      "created":new Date(),
      "role":user.role
    };
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getUser(id:string){
    return this.httpClient.get<User>(`${API}s/${id}`);
  }

  public register(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${API}/register`, {
      'email': email,
      'password': password
    });
  }

  public logout(){
    this.currentUser.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  numberOfDays(date1:Date,date2:Date){
    let diffInTime = date1.getTime() - date2.getTime();
    return diffInTime / (1000 * 3600 * 24);
  }

}
