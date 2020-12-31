import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CuentaService {
  API_URL = "http://146.83.102.99:8081";
  constructor(private http: HttpClient) {}
//logearse con su cuenta
  get_login(cuenta: any) {
    return this.http.post(`${this.API_URL}/api/cuentas/login/`, cuenta);
  }
  //insertar cuenta
  create_cuenta(cuenta: any) {
    return this.http.post(`${this.API_URL}/api/cuentas/`, cuenta);
  }
// entregar datos de la cuenta
  data_cuenta(cuenta: any) {
    return this.http.post(`${this.API_URL}/api/cuentas/data/`, cuenta);
  }
  //actualizar saldo de la cuentas
  update_cuenta(rut:string,cuenta: any) {
    return this.http.put(`${this.API_URL}/api/cuentas/update/${rut}`, cuenta);
  }
  //para ver quien rut puede registrarse en la cuenta
  get_cuenta_data(rut: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}/api/cuentas/list/${rut}`);
  }
  
}
