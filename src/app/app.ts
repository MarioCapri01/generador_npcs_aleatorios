import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Scripts } from './components/scripts/scripts';

@Component({
  imports: [RouterOutlet, Scripts],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly nombreProyecto = signal('Generador NPCs Aleatorios');
  protected readonly decripcion = signal('Describe los parámetros para el nuevo personaje');
  protected readonly autor = signal('Creado por: Yo');
}
