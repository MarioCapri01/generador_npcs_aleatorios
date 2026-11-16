import { Component, numberAttribute } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { iterator } from 'rxjs/internal/symbol/iterator';
import { CommonModule } from '@angular/common';
@Component({
  imports: [FormsModule, CommonModule],
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
  npcGenerado: object = {};
  npcAtributos: any[] = [];
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
    this.npcGenerado = {"Atributos_Sociales": atSoc,"Atributos_Fisicos": atFis,"Atributos_Mentales": atMen};
    this.npcAtributos = this.npcFormatado(JSON.stringify(this.npcGenerado));
    console.log(this.npcAtributos);
  }
  // Generamos un valor aleatorio entre 0 y 3
  valorAleatorio(): number{
    return Math.round(Math.random() * 3);
  }
  // Recorremos todos los stats del objeto y les sumamos 4
  sumamosBonificador(viejosStats: {[key: string]: number}): {[key: string]: number}{
    let nuevosStats : {[key: string]: number} = viejosStats;
    Object.keys(nuevosStats).forEach((atributo: string) =>{
      nuevosStats[atributo] += 4;
    });
    return nuevosStats;
  }
  // {atributo: valor, atributo2: valor2, ...} => [{atributo: valor}, {atributo2: valor2}]
  npcFormatado(npcString: string): any[]{//[{[key: string]: any[]}]{
    
    let npcObjeto = JSON.parse(npcString);
    let atributosIterados : any[] = [];
    Object.keys(npcObjeto).forEach((atributo: string) =>{
      let objetoLv1: {[key: string]: any} = {"categoria": atributo, "atributos": []};
      Object.keys(npcObjeto[atributo]).forEach((subAtributo: string) =>{
        objetoLv1["atributos"].push(subAtributo.concat(": ").concat(npcObjeto[atributo][subAtributo]));
      });
      atributosIterados.push(objetoLv1);
    });
    return atributosIterados;
  }
}
