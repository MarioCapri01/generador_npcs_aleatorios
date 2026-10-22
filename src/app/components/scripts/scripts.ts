import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-scripts',
  styleUrl: './scripts.css',
  templateUrl: './scripts.html'
})
export class Scripts {
  listaNPCs: string[] = [];
  nuevoNPC: string = "";
  sociales: boolean = false;
  mentales: boolean = false;
  fisicos: boolean = false;
  otrasHabilidades: object = {};
  generaNPC(sociales: boolean, mentales: boolean, fisicos: boolean){
    
    // Generamos valor aleatorio a las características 
    // Sintaxis -> let objeto : {[key: tipoClave1 | tipoClave2 ...]: tipoValor1 | tipoValor2 ...}
    let atSoc : {[key: string]: number} = {carisma: this.valorAleatorio(),
      apariencia: this.valorAleatorio(),
      manupulacion: this.valorAleatorio(),
    };// <- TODO: OPTIMIZAR ASIGNACION DE VALORES ALEATORIOS, LLAMAR MENOS VECES A LA FUNCIÓN
    let atMen : {[key: string]: number} = {astucia: this.valorAleatorio(),
      inteligencia: this.valorAleatorio(),
      percepcion: this.valorAleatorio(),
    };
    let atFis : {[key: string]: number} = {destreza: this.valorAleatorio(),
      fuerza: this.valorAleatorio(),
      resistencia: this.valorAleatorio(),
    };
    // Si la clasificación estaba marcada (ej: sociales == true), sumamos un bonificador a dichos parámetros.
    atSoc = sociales ? this.sumamosBonificador(atSoc) : atSoc;
    atFis = fisicos ? this.sumamosBonificador(atFis) : atFis;
    atMen = mentales ? this.sumamosBonificador(atMen) : atMen;
    console.log({"atSoc": atSoc,"atFis": atFis,"atMen": atMen});
    
  }
  valorAleatorio(): number{
    // Generamos un valor aleatorio entre 0 y 3
    return Math.round(Math.random() * 3);
  }
  sumamosBonificador(viejosStats: {[key: string]: number}): {[key: string]: number}{
    let nuevosStats : {[key: string]: number} = viejosStats;
    let propSoc : string[] = Object.keys(nuevosStats);
    propSoc.forEach((atributo: string) =>{
      nuevosStats[atributo] += 4;
    });
    return nuevosStats;
  }
}
