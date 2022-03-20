import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;  
  @Input() terminada = true; 

  constructor( public deseosService:DeseosService,
               private router: Router,
               private alertCrl: AlertController) { } 

  ngOnInit() {}

  ListaSeleccionada( lista: Lista ){

    if ( this.terminada){
    this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);  
    }

  }

  borrarLista( lista:Lista ){
    this.deseosService.borrarLista( lista );
  }

  async editarLista( lista: Lista ){
    const alert = await this.alertCrl.create({
      header: 'Editar Lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo, 
        placeholder: 'Nombre de la lista',
      }],
      buttons: [
        {
        text: 'cancelar',
        role: 'cancel',
        handler: () =>{
          console.log('cancelar');
          this.lista.closeSlidingItems(); 
        }
      },
      {
        text: 'crear',
        handler: (data) =>{
          console.log(data);
          if(data.titulo.lenght === 0 ){
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage(); 
          this.lista.closeSlidingItems(); 
        }
      }
    ]
    });
    await alert.present();
 
  }

}
