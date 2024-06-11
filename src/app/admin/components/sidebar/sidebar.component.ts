import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;

  @Output() toogle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toogle.emit(this.isSidebarOpen);
  }
}
