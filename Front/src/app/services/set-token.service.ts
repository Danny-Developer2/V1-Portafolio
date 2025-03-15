import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SetExpToken {
  tokeTimeValidator: string = '';
  Role: string = '';

  baseUrl = `${environment.apiUrl}Auth/read-token-data`;

  constructor(private http: HttpClient) {}

  // Método para validar el token
  setExpToken(token: string): Promise<number | null> {
    console.log(token)
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl, {token} , { withCredentials: true,})
        .subscribe({
          next: (response: any) => {
            if (response.dencryptedToken) {
              try {
                const decodedToken: any = jwtDecode(response.dencryptedToken);
                this.tokeTimeValidator = decodedToken['exp'];
                this.Role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                sessionStorage.setItem('role', this.Role);
                localStorage.setItem('expirationTime', this.tokeTimeValidator.toString());
                localStorage.setItem('token',token)
                sessionStorage.setItem('expirationTime', this.tokeTimeValidator.toString());

                const now = new Date().getTime();
                const expiration = parseInt(this.tokeTimeValidator, 10) * 1000;
                resolve(expiration - now);
              } catch (error) {
                console.error('Error al decodificar el token:', error);
                reject(error);
              }
            } else {
              console.error('Error: No se recibió `dencryptedToken` en la respuesta.');
              reject('No se recibió `dencryptedToken`.');
            }
          },
          error: (err) => {
            console.error('Error en la petición:', err);
            reject(err);
          }
        });
    });
  }
}
