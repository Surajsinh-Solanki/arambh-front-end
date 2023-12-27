import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTextService {
  constructor() {}
  private searchTextSource = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSource.asObservable();

  setSearchText(searchText: string) {
    this.searchTextSource.next(searchText);
  }
}
