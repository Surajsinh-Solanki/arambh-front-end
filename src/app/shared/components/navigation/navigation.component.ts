import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SearchTextService } from 'src/app/service/shared/search-text.service';
import { getFromStorage } from 'src/app/service/storage-service/storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isMenuOpen = false;
  searchText: string = '';
  logoutConfirmed: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private searchService: SearchTextService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
  ) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    let isUserLoggedIn: string | null = getFromStorage('isUserLoggedIn');
    if (isUserLoggedIn != null && isUserLoggedIn == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
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
