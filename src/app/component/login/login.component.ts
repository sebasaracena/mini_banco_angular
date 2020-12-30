import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GuardianService } from "src/app/guards/guardian.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public rut = null;
  public password = null;

  constructor(private route: Router, private guardian: GuardianService) {}

  ngOnInit(): void {
    // por si quedaron los datos en el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("password");
  }

  login() {
    Swal.showLoading();
    this.guardian.getlogin(this.rut, this.password);
  }

  create_user() {
    this.route.navigate(["crear_cuenta"]);
  }
}
