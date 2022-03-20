import { listaItem } from './vista-item-model';

export class Lista{
    id: number;
    titulo:string;
    creadaEn: Date;
    TerminadaEn: Date;
    terminada: boolean;
    items: listaItem[];

    constructor(titulo: string){
        
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}