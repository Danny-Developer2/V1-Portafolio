import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';

export interface Experiences {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  user: any;
  description: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class GetExperiencesService {
  private http = inject(HttpClient);
  private router: Router = new Router();
  Experiences: Experiences[] = [];

  baseUrl = `${environment.apiUrl}Experience`;

  constructor() {}

  getExperiences(): Observable<Experiences[]> {
    return this.http
      .get<Experiences[]>(this.baseUrl, { withCredentials: true })
      .pipe(
        map((response) => response || []),
        tap((data) => (this.Experiences = data))
      );
  }
}
