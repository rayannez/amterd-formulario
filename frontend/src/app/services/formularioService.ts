import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://amterd-formulario.onrender.com/api/formulario/enviar';

  enviarFormulario(data: unknown) {
    return this.http.post(this.apiUrl, data);
  }

}