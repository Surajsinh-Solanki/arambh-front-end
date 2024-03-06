import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SearchTextService } from 'src/app/service/shared/search-text.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isMenuOpen = false;
  searchText: string = '';
  logoutConfirmed: boolean = false;
  constructor(
    private searchService: SearchTextService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router:Router
  ) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearchChange(searchText: string) {
    this.searchService.setSearchText(this.searchText);
  }

  openLogoutDialog() {
    const logoutDialog = this.el.nativeElement.querySelector('#logoutDialog');
    if (logoutDialog) {
      this.renderer.addClass(logoutDialog, 'show-modal');
      this.renderer.addClass(logoutDialog, 'show');
    }
  }

  confirmLogout(confirmed: boolean) {
    this.logoutConfirmed = confirmed;
    const logoutDialog = document.getElementById('logoutDialog');
    if (logoutDialog) {
      logoutDialog.classList.remove('show');
    }
    if (this.logoutConfirmed) {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
      console.log('User confirmed logout');
    }
  }
}
