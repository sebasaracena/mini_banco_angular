import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { CuentaService } from "../service/cuenta.service";
import { Cuenta } from "../model/cuenta";

@Injectable({
  providedIn: "root",
})
export class GuardianService {
  loggedIn: Boolean = false;

  sql_cuenta: Cuenta = {
    rut: null,
    password: null,
  };
  constructor(private cuenta: CuentaService, private route: Router) {}

  getlogin(rut: string, password: string): boolean {
    let sentencia = null;
    this.sql_cuenta.rut = rut;
    this.sql_cuenta.password = password;
    //cargar datos de login
    this.cuenta.get_login(this.sql_cuenta).subscribe((resp) => {
      let login:any=resp;
      if (login.text!= "Ok") {
        Swal.fire({
          title: "Login de Usuario",
          text: "Acceso " + login.text,
          icon: "error",
          allowOutsideClick: false,
        });

        sentencia = false;
      } else {
        this.setUser(rut);
        this.setCorreo(password);
        Swal.fire({
          title: "Login de Usuario",
          text: "Acceso " + login.text,
          icon: "success",

          allowOutsideClick: false,
        });

        this.route.navigate(["/operaciones"]);
        sentencia = true;
      }
    });

    return sentencia;
  }

  setUser(rut: string): void {
    localStorage.setItem("rut", rut);
  }
  setCorreo(password: string): void {
    localStorage.setItem("password", password);
  }

  getCurrentUser(): String {
    let rut = localStorage.getItem("rut");
    let password = localStorage.getItem("password");

    if (!isNullOrUndefined(rut) && !isNullOrUndefined(password)) {
      this.loggedIn = true;
      return rut;
    } else return null;
  }

  getlogout() {
    localStorage.removeItem("rut");
    this.loggedIn = false;
  }
}
