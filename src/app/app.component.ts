import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GraphComponent} from './graph/graph.component';
import {Edge, Graph, Node} from './types/types';
import {GraphRankViewerComponent} from './graph-rank-viewer/graph-rank-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent, GraphRankViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  graph?: Graph;

  ngOnInit() {
    this.graph = new Graph({
      nodes: [
        new Node({id: 1, x: 200, y: 0}),
        new Node({id: 2, x: 150, y: 100}),
        new Node({id: 3, x: 300, y: 100}),
        new Node({id: 4, x: 250, y: 200}),
        new Node({id: 5, x: 350, y: 200}),
        new Node({id: 6, x: 200, y: 300}),
      ],
      edges: [
        new Edge({source_id: 1, destination_id: 2}),
        new Edge({source_id: 1, destination_id: 3}),
        new Edge({source_id: 3, destination_id: 4}),
        new Edge({source_id: 3, destination_id: 5}),
        new Edge({source_id: 2, destination_id: 6}),
        new Edge({source_id: 4, destination_id: 6}),
        new Edge({source_id: 5, destination_id: 6}),
      ]
    });

    this.graph.rankNodes();
  }
}

