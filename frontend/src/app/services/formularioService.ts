import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private readonly http = inject(HttpClient);

  private readonly api = 'http://localhost:3000/api/formulario';

  enviarFormulario(data: unknown) {
    return this.http.post(`${this.api}/enviar`, data);
  }

}