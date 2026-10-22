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
    };
    interface AtMentales {
      astucia: number, inteligencia: number, percepcion: number
    };
    let atMen : AtMentales = {astucia: this.valorAleatorio(),
      inteligencia: this.valorAleatorio(),
      percepcion: this.valorAleatorio(),
    };
    console.log({"antes: ": atSoc});
    interface AtFisicos {
      destreza: number, fuerza: number, resistencia: number
    };
    let atFis : AtFisicos = {destreza: this.valorAleatorio(),
      fuerza: this.valorAleatorio(),
      resistencia: this.valorAleatorio(),
    };
    // Si la clasificación estaba marcada (ej: sociales == true), sumamos un bonificador a dichos parámetros.
    //type SocialKeys = keyof atSoc;
    if(sociales){
      // Almacenamos las Keys del objeto en un array de strings para recorrer todas sus propiedades y sumarle el bonus
      let propSoc : string[] = Object.keys(atSoc);
      propSoc.forEach((atributo: string) =>{
        atSoc[atributo] += 4;
      })
    }
    
  }
  valorAleatorio(): number{
    // Generamos un valor aleatorio entre 0 y 3
    return Math.round(Math.random() * 3);
  }
}
