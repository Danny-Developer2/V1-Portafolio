import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface updateProject {
  id: number;
  name: string;
  description: string;
  technology: string;
  url: string;
  imgUrl: string;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  technology: string;
  url: string;
  imgUrl: string;
  skills:  Skill[];
  experience: Experience[];
}

export interface Skill {
  id: number;
  skillName: string;
  name: string;
  percentage: number;
  iconUrl: string;
  description: string;
}

export interface Experience {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}


@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  baseUrl = `${environment.apiUrl}Projects`;
  private http = inject(HttpClient);
  private router: Router = new Router();
  projects: Project[] = [];

  constructor(private toastr:ToastrService) {}

  getProjects(page: number, size: number): Observable<PagedResult<Project>> {
    const url = `${this.baseUrl}?pageNumber=${page}&pageSize=${size}`;
  
    return this.http
      .get<PagedResult<Project>>(url, {
        withCredentials: true, // Si necesitas enviar cookies (autenticación)
      })
      .pipe(
        map(response => response), // No necesitas `|| []` porque la respuesta no es array
        tap(data => {
          this.projects = data.items; // Solo guarda los items en `projects`
        })
      );
  }
  
  

  getProjectById(id: number): Observable<Project> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return new Observable(); // Devuelve un observable vacío para evitar errores
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Corregir la URL para interpolar correctamente el id
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Project>(url, { headers, withCredentials:true });
  }

  // deleteProject(id:number): Observable<Project> {
  //   const token = localStorage.getItem('token'); // Obtener el token del localStorage
  //   if (!token) {
  //     console.error('No se encontró el token en el localStorage.');
  //     return new Observable(); // Devuelve un observable vacío para evitar errores
  //   }
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   const url = `${this.baseUrl}/${id}`;
  //   console.log('Eliminando');
  //   return this.http.delete<Project>(url, { headers }).pipe(
  //     tap((data) => console.log('Proyecto eliminado:', data)) // Verifica la respuesta
  //   );
  // }

  deleteProject(id: number): void {
    // Validar que el ID del proyecto es válido
    if (!id) {
      console.error('ID de proyecto no válido');
      this.toastr.error('Error al eliminar el proyecto', '', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
      });
      return; // Salir si el ID no es válido
    }
  
    // Realizar la solicitud para eliminar el proyecto
    this.http
      .delete<string>(`${this.baseUrl}/${id}`, {
        responseType: 'text' as 'json',
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
  
          // Mensaje de éxito
          this.toastr.success('Proyecto eliminado con éxito', '', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
          });
  
          // Actualizar la lista de proyectos (puedes hacer esto de la forma que prefieras)
          this.getProjects(1,3); // Si tienes un método que obtiene todos los proyectos
        },
        error: (error) => {
          console.error('Error al eliminar el proyecto:', error);
          console.error('Estado del error:', error.status);
  
          // Mostrar un mensaje de error
          this.toastr.error('Error al eliminar el proyecto', '', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
          });
        },
      });
  }
  

  updateProject(id: number, project: any): Observable<boolean> {
    return this.http
      .put<string>(`${this.baseUrl}/${id}`, project, {
        responseType: 'text' as 'json',
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          console.log('Respuesta del servidor:', response);
          return true; // Devuelve true si la actualización fue exitosa
        }),
        catchError((error) => {
          console.error('Error al actualizar el proyecto:', error.message);
          return of(false); // Devuelve false en caso de error
        })
      );
  }
}
