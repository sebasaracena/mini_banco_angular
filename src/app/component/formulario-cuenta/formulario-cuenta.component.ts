import { Component, OnInit } from "@angular/core";
import { Cuenta } from "src/app/model/cuenta";
import { CuentaService } from "src/app/service/cuenta.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-formulario-cuenta",
  templateUrl: "./formulario-cuenta.component.html",
  styleUrls: ["./formulario-cuenta.component.css"],
})
export class FormularioCuentaComponent implements OnInit {
  //modelo para la tabla cuenta
  cuenta: Cuenta = {
    rut: null,
    nombre: null,
    correo: null,
    password: null,
  };
  //variable para confirmar password
  confirmar_passwd: string = null;
  //variable para confirmar la insercion de la cuenta
  resultado: boolean = false;
  constructor(private cuenta_service: CuentaService, private route: Router) {}

  ngOnInit(): void {}

  guardar() {
    Swal.showLoading();
    this.cuenta_service.create_cuenta(this.cuenta).subscribe((resp) => {
      let cuenta: any = resp;
      if (cuenta.text == "la cuenta ha sido creada") {
        this.resultado = true;
        Swal.close();
      } else {
        this.resultado = false;
        Swal.fire({
          title: "¡No fue posible crear su cuenta!",
          html:
            "<hr/><h5> Rut registrado en el sistema o correo ya tiene una cuenta asociada en el sistema</h5><hr/>",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    });
  }

  login(){
   this.route.navigate(['/home']);
  }
}
