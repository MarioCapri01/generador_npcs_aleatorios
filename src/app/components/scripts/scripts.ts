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
  valorMaximo: number = 3;
  valorBonificador: number = 2;
  generaNPC(sociales: boolean, mentales: boolean, fisicos: boolean){
    
    // Generamos valor aleatorio a las características 
    // Sintaxis -> let objeto : {[key: tipoClave1 | tipoClave2 ...]: tipoValor1 | tipoValor2 ...}
    let atributosSociales : string[] = ["Carisma","Apariencia","Manipulacion"];
    let atributosMentales : string[] = ["Astucia","Inteligencia","Percepcion"];
    let atributosFisicos : string[] = ["Destreza","Fuerza","Resistencia"];
    let atSoc : {[key: string]: number} = this.generatributosAleatorios(atributosSociales, this.valorMaximo, sociales);
    let atMen : {[key: string]: number} = this.generatributosAleatorios(atributosMentales, this.valorMaximo, mentales);
    let atFis : {[key: string]: number} = this.generatributosAleatorios(atributosFisicos, this.valorMaximo, fisicos);
    this.npcGenerado = {"Atributos_Sociales": atSoc,"Atributos_Mentales": atMen,"Atributos_Fisicos": atFis};
    this.npcAtributos = this.npcFormatado(JSON.stringify(this.npcGenerado));
    console.log(this.npcAtributos);
  }
  // Generamos un valor aleatorio entre 0 y 3
  valorAleatorio(): number{
    return Math.round(Math.random() * 3);
  }
  // Genera valores aleatorios.
  //  atributos: lista de características del personaje.
  //  valorMaximo: límite del valor generado.
  //  bonificador: si está activo, sumanos un valor predeterminado..
  generatributosAleatorios(atributos: string[], valorMaximo : number, bonificador : boolean): {[key: string]: number}{
    let nuevoObjeto : {[key: string]: number} = {};
    atributos.forEach((atributo: string) =>{
      let valorAleatorio : number = Math.round(Math.random() * valorMaximo);
      valorAleatorio = valorAleatorio === 0 ? 1 : valorAleatorio;
      nuevoObjeto[atributo] = bonificador ? valorAleatorio + this.valorBonificador : valorAleatorio;
    });
    return nuevoObjeto;
  }
  // {atributo: valor, atributo2: valor2, ...} => [{categoria: Nombre_Categoria, atributos: ["atributo: valor", ...}, ...]
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
