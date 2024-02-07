import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Node} from '../types/types';

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss'
})
export class NodeComponent implements AfterViewInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() node?: Node;
  @Output() nodeChanged = new EventEmitter<Node>();

  mousedown: boolean = false;

  currentInternalOffsetX?: number;
  currentInternalOffsetY?: number;

  startingPositionX?: number;
  startingPositionY?: number;

  currentClientX?: number;
  currentClientY?: number;

  ngAfterViewInit() {
    this.calculateSnappingPointOffsets();
    this.nodeChanged.emit(this.node);
  }

  @HostListener('mousedown', ['$event']) md($event: MouseEvent) {
    this.mousedown = true;

    this.calculateSnappingPointOffsets();

    this.startingPositionX = this.node?.x ?? 0;
    this.startingPositionY = this.node?.y ?? 0;

    this.currentInternalOffsetX = $event.offsetX;
    this.currentInternalOffsetY = $event.offsetY;

    this.currentClientX = $event.clientX;
    this.currentClientY = $event.clientY;

    document.addEventListener(
      'mouseup',
      () => {
        this.mousedown = false;
        document.removeEventListener('mousemove', this.mml);
      },
      {once: true});

    document.addEventListener('mousemove', this.mml);
  }

  private mml = ($event: MouseEvent) => {
    const movage = {
      x: ($event.clientX - (this.currentClientX ?? 0)),
      y: ($event.clientY - (this.currentClientY ?? 0)),
    };

    if (this.node != null) {
      this.node.x = (this.startingPositionX ?? 0) + movage.x;
      this.node.y = (this.startingPositionY ?? 0) + movage.y;
      this.nodeChanged.emit(this.node);
    }
  }

  private calculateSnappingPointOffsets() {
    if (!this.elementRef?.nativeElement || !this.node) {
      return;
    }

    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;

    this.node.snapTopX = width / 2;
    this.node.snapTopY = 0;

    this.node.snapBottomX = width / 2;
    this.node.snapBottomY = height;
  }
}

