import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GraphComponent} from './graph/graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graph-viewer';
}

