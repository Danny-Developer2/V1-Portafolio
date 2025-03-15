import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SetExpToken } from '../../services/set-token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private setToken = inject(SetExpToken);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if (this.loginService.usuarioLogeado()) {
      this.router.navigate(['/']);
    }
  }

  // Método de login
  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: async (response) => {
        // console.log(response.token);
        
        try {
          this.setToken.setExpToken(response.token);
          

          this.toastr.success('Login exitoso', 'Bienvenido!', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
          });
          this.router.navigate(['/']);
        } catch (error) {
          this.toastr.error('Error al procesar el token', 'Error', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error en el login', error.error.message, {
          timeOut: 5000,
          positionClass: 'toast-top-right',
        });
        console.log(error);
      }
    });
  }
}
