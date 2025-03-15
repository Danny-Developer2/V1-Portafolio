import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCertificacionesService {

   private http = inject(HttpClient);
    private router: Router = new Router();
  
    baseUrl = `${environment.apiUrl}`;
    

  constructor() { }

  getCertificaciones(): Observable<any> {
    const url = `${this.baseUrl}DataProject`;  // URL completa
    return this.http.get<any>(url,{withCredentials:true});  // Realiza una solicitud GET
  }
}
