import { Component, OnInit } from "@angular/core";
import { CuentaService } from "../../service/cuenta.service";
import { Cuenta } from "../../model/cuenta";
import Swal from "sweetalert2";

@Component({
  selector: "app-operaciones",
  templateUrl: "./operaciones.component.html",
  styleUrls: ["./operaciones.component.css"],
})
export class OperacionesComponent implements OnInit {
  usuario: string = null;
  sql_cuenta: Cuenta = {
    rut: null,
  };

  constructor(private cuenta_service: CuentaService) {}

  ngOnInit(): void {
    this.sql_cuenta.rut = localStorage.getItem("rut");
    Swal.showLoading();
    // llamando el servicio para extraer datos del usuario como su nombre
    this.cuenta_service.data_cuenta(this.sql_cuenta).subscribe((resp) => {
      let cuentas: any = resp;
      this.usuario = cuentas.map((cuenta) => cuenta.nombre);
      Swal.close();
    });
  }

  //funcion para info de cada problema o modulo planteado en el examen
  info_operacion(val: string) {
    let mensaje = null;
    if (val == "Cargar Saldo") {
      mensaje =
        "Formulario que permita agregar fondos una cuenta (simulando un depósito de fondos), solo debe llevar un input que permita ingresar el monto a depositar y un botón que permita aceptar.";
    } else if (val == "Retirar Saldo") {
      mensaje =
        "Formulario que permita retirar dinero de una cuenta, solo un campo del monto a retirar y un aceptar. La cuenta no puede quedar con saldo negativo";
    } else if (val == "Transferencia") {
      mensaje =
        "Formulario para transferir a un tercero, se debe solicitar como entrada el Rut destino y el monto a transferir, el monto permitido debe ser menor o igual al saldo disponible en la cuenta origen. La cuenta origen no puede quedar con saldo negativo, se debe validar que la cuenta destino este registrada en el sistema.";
    } else if (val == "Historial") {
      mensaje =
        "Listado de movimientos Debe mostrar los movimientos realizados (para cada cliente consultado) ya se cargas de saldo y transferencias (entrantes y salientes).";
    }

    Swal.fire({
      title: val,
      html: '<hr/><div align="justify">' + mensaje + "<hr>",
      icon: "info",
    });
  }
}
