import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { GuardianService } from "./guardian.service";

@Injectable({
  providedIn: "root",
})
export class GuardianGuard implements CanActivate {
  constructor(private guardian: GuardianService, private route: Router) {}
  canActivate() {
    // sentencia para ver que el usuario esta logeado
    // obteniendo asi acceso a las funciones que pide el sistema
    if (this.guardian.getCurrentUser()) {
      return true;
    } else {
      this.route.navigate(["/home"]);
      return false;
    }
    
  }
}
