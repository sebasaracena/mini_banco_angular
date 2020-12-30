import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { OperacionesComponent } from './component/operaciones/operaciones.component';
import { GuardianGuard } from './guards/guardian.guard';
import { FormularioCuentaComponent } from './component/formulario-cuenta/formulario-cuenta.component';
import { CargarSaldoComponent } from './component/cargar-saldo/cargar-saldo.component';
import { SacarSaldoComponent } from './component/sacar-saldo/sacar-saldo.component';
import { TransferenciaComponent } from './component/transferencia/transferencia.component';
import { HistorialComponent } from './component/historial/historial.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: LoginComponent,
  },
  {
    path: "operaciones",
    component: OperacionesComponent,
    canActivate:[GuardianGuard]
  },
  {
    path: "crear_cuenta",
    component: FormularioCuentaComponent
  },
  {
    path: "cargar_saldo",
    component: CargarSaldoComponent,
    canActivate:[GuardianGuard]
  },
  {
    path: "retirar_saldo",
    component: SacarSaldoComponent,
    canActivate:[GuardianGuard]
  
  },
  {
    path: "transferencia",
    component: TransferenciaComponent,
    canActivate:[GuardianGuard]
  },
  {
    path: "historial",
    component: HistorialComponent,
    canActivate:[GuardianGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
