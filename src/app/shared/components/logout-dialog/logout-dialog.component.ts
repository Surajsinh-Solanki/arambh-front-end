import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent {
  @Output() confirmLogout = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmLogout.emit(true);
  }

  onCancel() {
    this.confirmLogout.emit(false);
  }
}
