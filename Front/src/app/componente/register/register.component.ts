import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ValidateTokenService } from '../../services/validate-token.service';
import { ToastrService } from 'ngx-toastr';
import { SetExpToken } from '../../services/set-token.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerUserFrom: FormGroup;
  formData = new FormData();
  private setToken = inject(SetExpToken);

  constructor(
    private fb: FormBuilder,
    private registerUser: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerUserFrom = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      passwordHash: ['', [Validators.required, Validators.minLength(8)]],
      // role: 0
    });
  }

  onSbmit() {
    if (this.registerUserFrom.valid) {
      this.formData = {
        id: Math.floor(Math.random() * 1000),
        ...this.registerUserFrom.value,
      };
      try {
        this.registerUser.registerUser(this.formData).subscribe({
          next: (response) => {
            console.log(response.token);
            this.setToken.setExpToken(response.token);
            this.toastr.success('Usuario Registrado con Exito', '', {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              closeButton: true,
              progressBar: true,
              tapToDismiss: true,
            });
            // this.router.navigate(['/'])
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          },
        });
      } catch (error) {
        this.toastr.error(
          'Todos los campos son obligatorios y la contraseña debe tener al menos 8 caracteres'
        );
      }
    }
  }
}
