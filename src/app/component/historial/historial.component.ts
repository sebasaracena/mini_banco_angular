import { Component, OnInit } from "@angular/core";
import { TransferenciaService } from "../../service/transferencia.service";
import { Cuenta } from "../../model/cuenta";
import { HistorialService } from "../../service/historial.service";
import { Observable } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { CuentaService } from "../../service/cuenta.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-historial",
  templateUrl: "./historial.component.html",
  styleUrls: ["./historial.component.css"],
})
export class HistorialComponent implements OnInit {
  //para cosultar las transacciones que se han realizado de la cuenta
  cuenta: Cuenta = {
    rut: null,
  };
  public origen = [];
  public destino = [];
  public data = [];
  //
  constructor(
    private historia_service: HistorialService,
    private cuenta_service: CuentaService
  ) {}

  ngOnInit(): void {
    this.cuenta.rut = localStorage.getItem("rut");
    Swal.showLoading();
    this.get_cuenta();
  }
  get_cuenta() {
    this.data = [];
    this.cuenta_service.data_cuenta(this.cuenta).subscribe((resp) => {
      let cuentas: any = resp;
      this.get_datos_origen();
      cuentas.map((cliente) => {
        this.data.push(cliente);
      });
    });
  }

  get_datos_origen() {
    this.origen = [];
    this.historia_service.datos_origen(this.cuenta.rut).subscribe((resp) => {
      let arreglo: any = resp;
      this.get_datos_destino();
      arreglo.map((result) => this.origen.push(result));
    });
  }

  get_datos_destino() {
    this.destino = [];
    this.historia_service.datos_destino(this.cuenta.rut).subscribe((resp) => {
      let arreglo: any = resp;

      arreglo.map((result) => this.destino.push(result));
      Swal.close();
    });
  }
}
