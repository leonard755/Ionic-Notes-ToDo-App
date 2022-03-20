import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { listaItem } from 'src/app/models/vista-item-model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = ''; 

  constructor( private deseosService: DeseosService,
               private route:ActivatedRoute)  { 
 
  const listaId = this.route.snapshot.paramMap.get('listaId');

  console.log(listaId)
 
  this.lista = this.deseosService.obtenerLista( listaId );
  console.log(this.lista)
  }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new listaItem( this.nombreItem)
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage(); 
  }

  cambioCheck( item: listaItem ){
    console.log(item); 

    const pendientes = this.lista.items
          .filter( itemData => !itemData.completado)
          .length;

          if( pendientes === 0 ){
            this.lista.TerminadaEn = new Date();
            this.lista.terminada = true;
          } else {
            this.lista.TerminadaEn = null;
            this.lista.terminada = false;
          }

          console.log('pendietes', pendientes);
          
          this.deseosService.guardarStorage();

          console.log(this.deseosService.listas);
  }

  borrar( i: number ){

    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
