import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: "root",
})
export class HistorialService {
  API_URL = "http://localhost:8080";
  constructor(private http: HttpClient) {}

  //funciones para realizar el historial
  datos_origen(rut:String){
    return this.http.get(`${this.API_URL}/api/transaccion/list_origin/${rut}`);
  }
  //funcion para ver si recibio transferencia de Terceros
  datos_destino(rut:String){
    return this.http.get(`${this.API_URL}/api/transaccion/list_destiny/${rut}`);
  }
}