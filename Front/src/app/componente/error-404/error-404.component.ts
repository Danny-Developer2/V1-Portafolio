import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-error404',
  // standalone: true,
  imports: [RouterLink],
  templateUrl: './error-404.component.html'
})
export class Error404Component implements OnInit {

  error:any


  // constructor(private router: Router) {
  //   const navigation = this.router.getCurrentNavigation();
  //   this.error = navigation?.extras?.state?.['error'];
  // }

  constructor() { }






  ngOnInit(): void {
    

    this.error = {
      message: 'La ruta que intentaste acceder no existe',
      status: 404
    }
  }
}

