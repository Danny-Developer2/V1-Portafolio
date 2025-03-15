import { Component, OnInit } from '@angular/core';
import { GetCertificacionesService } from '../../services/get-certificaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificaciones',
  imports: [CommonModule],
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent implements OnInit {
  certificaciones: any[] = [];
  chunkedCertificaciones: any[] = [];

  constructor(private certificacionesService: GetCertificacionesService) {}

  ngOnInit() {
    this.certificacionesService.getCertificaciones().subscribe((data) => {
      console.log(data); // Verifica la respuesta completa en la consola

      // Accede a los valores dentro de $values
      this.certificaciones = data.$values; // Aquí accedemos a la propiedad $values
      this.chunkedCertificaciones = this.chunkArray(this.certificaciones, 4);
    });
  }

  // Función para dividir el array en bloques de tamaño "size"
  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
