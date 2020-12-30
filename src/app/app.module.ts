import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { OperacionesComponent } from './component/operaciones/operaciones.component';
import { FormularioCuentaComponent } from './component/formulario-cuenta/formulario-cuenta.component';
import { CargarSaldoComponent } from './component/cargar-saldo/cargar-saldo.component';
import { SacarSaldoComponent } from './component/sacar-saldo/sacar-saldo.component';
import { TransferenciaComponent } from './component/transferencia/transferencia.component';
import { HistorialComponent } from './component/historial/historial.component';
import { CabeceraComponent } from './pagina/cabecera/cabecera.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OperacionesComponent,
    FormularioCuentaComponent,
    CargarSaldoComponent,
    SacarSaldoComponent,
    TransferenciaComponent,
    HistorialComponent,
    CabeceraComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AutocompleteLibModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
