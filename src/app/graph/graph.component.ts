import {AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {Graph} from '../types/types';
import {NodeComponent} from '../node/node.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    NodeComponent,
    JsonPipe
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasElement') canvasElement?: ElementRef<HTMLCanvasElement>;

  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() graph?: Graph;

  private canvasInitialized = false;

  ngOnInit() {}

  ngAfterViewInit() {
    const graphHeight = this.elementRef.nativeElement.offsetHeight;
    const graphWidth = this.elementRef.nativeElement.offsetWidth;

    if (this.canvasElement?.nativeElement) {
      this.canvasElement.nativeElement.height = graphHeight;
      this.canvasElement.nativeElement.width = graphWidth;
      this.canvasInitialized = true;
      this.renderEdges();
    }
  }

  renderEdges() {
    if (!this.canvasElement?.nativeElement || !this.canvasInitialized || !this.graph?.edges) {
      return;
    }

    const context = this.canvasElement.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    context.clearRect(0, 0, this.canvasElement?.nativeElement?.offsetWidth ?? 600, this.canvasElement?.nativeElement?.offsetHeight ?? 600)

    this.graph.edges.forEach(edge => {
      if (edge?.source_id && edge?.destination_id) {
        const source = this.graph?.node(edge.source_id);
        const destination = this.graph?.node(edge.destination_id);

        const srcX = (source?.x ?? 0) + (source?.snapBottomX ?? 0);
        const srcY = (source?.y ?? 0) + (source?.snapBottomY ?? 0);

        const destX = (destination?.x ?? 0) + (destination?.snapTopX ?? 0);
        const destY = (destination?.y ?? 0) + (destination?.snapTopY ?? 0);

        const intensity = 40;

        context.beginPath();
        context.moveTo(srcX, srcY);
        // context.lineTo(destX, destY);

        context.bezierCurveTo(
          srcX,
          srcY + intensity,
          destX,
          destY - intensity,
          destX,
          destY);

        context.stroke();
      }
    });
  }
}
