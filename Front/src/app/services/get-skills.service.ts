import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';


export interface Skills {
  id: number;
  name: string;
  percentage: number;
  iconUrl: string;
  description: string;
  users: { $values: User[] };
  userSkills: any;  // Puedes definir una interfaz si conoces su estructura
  proyectSkills: any;  // Puedes definir una interfaz si conoces su estructura
}

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetSkillsService {

    private http = inject(HttpClient);
    private router: Router = new Router();
    skills: Skills[] = [];
    
  
    baseUrl = `${environment.apiUrl}Skills`;

  constructor() { }


   getSkills(): Observable<Skills[]> {
      
  
     
      
  
      return this.http.get<{$values:Skills[]}>(this.baseUrl, {  withCredentials:true }).pipe(
        map(response => response?.$values || []),
        tap((data) =>this.skills = data)
        
      )
    }
}


