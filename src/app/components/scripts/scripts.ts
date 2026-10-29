import { Component, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-scripts',
  styleUrl: './scripts.css',
  templateUrl: './scripts.html'
})/*
@Component({
  imports: [JsonPipe],
  template: `<div>
    <p>Without JSON pipe:</p>
    <pre>{{ object }}</pre>
    <p>With JSON pipe:</p>
    <pre>{{ object | json }}</pre>
  </div>`,
})*/
export class Scripts {
  listaNPCs: string[] = [];
  nuevoNPC: string = "";
  sociales: boolean = false;
  mentales: boolean = false;
  fisicos: boolean = false;
  otrasHabilidades: object = {};
  npcGenerado: object = {};
  npcString: any[] = [];
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
    this.npcString = this.npcFormatado(JSON.stringify(this.npcGenerado));
    console.log(this.npcString);
    //TODO: Investigar JSON pipe para mostrar resultado de json
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
  npcFormatado(npcString: string): string[]{
    let npcObjeto = JSON.parse(npcString);
    let atributosIterados : string[] = [];
    Object.keys(npcObjeto).forEach((atributo: string) =>{
      let nuevoObjeto: string = atributo.concat(": \n");
      Object.keys(npcObjeto[atributo]).forEach((subAtributo: string) => {
        nuevoObjeto = nuevoObjeto.concat("\t - ").concat(subAtributo).concat(": ").concat(npcObjeto[atributo][subAtributo]).concat("\n");
      });
      atributosIterados.push(nuevoObjeto);
    });
    console.log(atributosIterados);
    return atributosIterados;
  }
}
