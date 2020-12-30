import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TransferenciaService {
  API_URL = "http://localhost:8080";
  constructor(private http: HttpClient) {}

  registrar_transferencia(transferencia: any) {
    return this.http.post(`${this.API_URL}/api/transaccion/`, transferencia);
  }
  
}
