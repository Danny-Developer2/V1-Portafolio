import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetExpToken } from '../../services/set-token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginRegisterForms: FormGroup;

  private setToken = inject(SetExpToken);

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRegisterForms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    if (this.loginService.usuarioLogeado()) {
      this.router.navigate(['/']);
    }
  }

  // Método de login
  onLogin() {
    const formLogin = {
      ...this.loginRegisterForms.value,
    };
    try {
      this.loginService.login(formLogin.email,formLogin.password).subscribe({
        next: async (response) => {
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
          return error;
        },
      });
    } catch (error) {
      console.error('Error en el login:', error);
      this.toastr.error('Error en el login', 'Error', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
      });
      return;
    }
  }
}
