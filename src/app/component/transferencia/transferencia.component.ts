import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Cuenta } from "../../model/cuenta";
import { CuentaService } from "../../service/cuenta.service";
import { Transferencia } from "../../model/transferencia";
import { TransferenciaService } from "../../service/transferencia.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.component.html",
  styleUrls: ["./transferencia.component.css"],
})
export class TransferenciaComponent implements OnInit {
  cuenta: Cuenta = {
    rut: null,
  };
  cuenta_destino: Cuenta = {
    rut: null,
    nombre: null,
  };

  data: any = [];
  data2: any = [];
  resultado: boolean = false;

  transferencia: Transferencia = {
    cuenta_destino: null,
    cuenta_origen: null,
    monto: null,
    saldo: null,
    saldo_trans_entrante: null,
    tipo: "Tranferencia",
  };
  //variables para el autocomplete
  public data$: Observable<any[]>;
  public keyword = "rut";
  public keywords = ["rut", "nombre", "saldo"];

  //constructor de la clase
  constructor(
    private cuenta_service: CuentaService,
    private transferencia_service: TransferenciaService
  ) {}

  ngOnInit(): void {
    this.cuenta.rut = localStorage.getItem("rut");
    //asignando valor al modelo de transferencia
    this.transferencia.cuenta_origen = this.cuenta.rut;

    Swal.showLoading();
    this.get_cuenta(0);
    this.get_cuenta_data();
  }
  //funcion para saber el saldo del cliente
  get_cuenta(operation: number) {
    this.data = [];
    this.cuenta_service.data_cuenta(this.cuenta).subscribe((resp) => {
      let cuentas: any = resp;

      cuentas.map((cliente) => {
        this.data.push(cliente);
      });
      if (operation == 0) Swal.close();
    });
  }
  //autocomple//
  get_cuenta_data() {
    this.data$ = this.cuenta_service.get_cuenta_data(this.cuenta.rut);
  }
  //verificar que el dato el cual fue intrducido este en la base de datos del sistema
  selectEvent(val) {
    this.cuenta_destino.nombre = val.nombre;
    this.cuenta_destino.saldo = val.saldo;
    this.cuenta_destino.rut = val.rut;
    //cargando datos de la cuenta destino
    Swal.showLoading();
    this.get_cuenta_destino(0);
  }
  //extraer datos de la cuenta destino
  get_cuenta_destino(operation: number) {
    this.data2 = [];
    this.cuenta_service.data_cuenta(this.cuenta_destino).subscribe((resp) => {
      let cuentas: any = resp;

      cuentas.map((cliente) => {
        this.data2.push(cliente);
      });
      if (operation == 0) Swal.close();
    });
  }
  //cuendo digitan una centa que no existe y ya seleccionado la cuenta anterior
  cambioSelect(val) {
    this.cuenta_destino.nombre = null;
    this.cuenta_destino.rut = null;
  }

  transferir_dinero() {
    //operacion para ver si puede extraer esa cantidad
    let saldo = parseInt(this.data[0].saldo);
    let saldo_trans_entrante = parseInt(this.data2[0].saldo);
    //poninedo datos al la base de datos de transferencia
    this.transferencia.cuenta_destino = this.cuenta_destino.rut;
    //la suma de saldo despues de recibir la transferencia entrante a la cuanta del destinatario
    this.transferencia.saldo_trans_entrante =
      saldo_trans_entrante + this.transferencia.monto;
    //asignado salda actual para lo base de datos.
    this.cuenta.saldo = saldo - this.transferencia.monto;
    this.transferencia.saldo = this.cuenta.saldo;
    //acualizar saldo del destinatario
    this.cuenta_destino.saldo = this.transferencia.saldo_trans_entrante;
    //sentencia para que no deposite mas de lo que se tiene en la cuenta
    if (this.cuenta.saldo < 0) {
      Swal.fire({
        html:
          "<hr/>Estimado usuario no es posible realizar esta operación, ya no cuenta con suficiente saldo para extraer esta cantidad.<hr/>",
        icon: "error",
        allowOutsideClick: false,
      });
    } else {
      Swal.fire({
        title: "¿Esta seguro de continuar esta operación?",
        html: "<hr/>",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
      }).then((result) => {
        //cuando confirma la operación
        if (result.isConfirmed) {
          this.transferencia_service
            .registrar_transferencia(this.transferencia)
            .subscribe((resp) => {
              this.cuenta_service
                .update_cuenta(this.cuenta.rut, this.cuenta)
                .subscribe((resp) => {
                  this.cuenta_service
                    .update_cuenta(this.cuenta_destino.rut, this.cuenta_destino)
                    .subscribe((resp) => {
                      Swal.fire({
                        html: "<hr/>La transacción ha sido realizada<hr/>",
                        icon: "success",
                        allowOutsideClick: false,
                      });
                      this.resultado = true;
                      //recardo el dato para ver el nuevo saldo del cliente
                      this.get_cuenta(1);
                    });
                });
            });
        }
      });
    }
  }
  //fin de la funcion
}
