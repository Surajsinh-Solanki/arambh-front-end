import { Component } from '@angular/core';
import { SearchTextService } from 'src/app/service/shared/search-text.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isMenuOpen = false;
  searchText: string = '';
  constructor(private searchService: SearchTextService) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearchChange(searchText: string) {
    this.searchService.setSearchText(this.searchText);
  }
}
