import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   info_contacto(){
    Swal.fire({
      title:'Contacto',
      html:'<hr />'+
      '<strong>desarrollador: </strong> Sebastian Aracena.<hr />'+
      '<strong>correo:</strong> sebastian.andres.aracena@gmail.com.<hr />'+
      '<strong>fono:</strong> +56 9 9806 1478.<hr />',
    
    })
  }
}
