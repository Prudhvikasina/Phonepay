import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectItem } from './models/project-item.model';
import * as ProjectItemActions from './store/actions/project-items.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomItems$: Observable<ProjectItem[]>;
  savedItems$: Observable<ProjectItem[]>;

  selectedItem: ProjectItem | null = null;
  upiId: string = '';

  constructor(private store: Store<{ projectItems: { randomItems: ProjectItem[], savedItems: ProjectItem[] } }>) {
    this.randomItems$ = store.select(state => state.projectItems.randomItems);
    this.savedItems$ = store.select(state => state.projectItems.savedItems);
  }

  ngOnInit() {
    this.store.dispatch(ProjectItemActions.loadRandomItems());
  }

  saveItem(item: ProjectItem) {
    this.store.dispatch(ProjectItemActions.saveItem({ item }));
  }

  removeItem(id: number) {
    this.store.dispatch(ProjectItemActions.removeItem({ id }));
  }

  selectItemForPurchase(id: number) {
    this.savedItems$.subscribe(items => {
      this.selectedItem = items.find(item => item.id === id) || null;
    });
  }

  processPayment() {
    if (!this.upiId || !this.selectedItem) {
      alert('Please enter a valid UPI ID and select an item.');
      return;
    }
  
    const upiLink = `upi://pay?pa=${encodeURIComponent(this.upiId)}&pn=${encodeURIComponent('Your Name')}&tn=${encodeURIComponent(this.selectedItem.name)}&am=${encodeURIComponent(this.selectedItem.price)}&cu=INR`;
  
    // Check if the environment supports UPI schemes
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = upiLink;
    } else {
      alert('UPI payment can only be initiated from a mobile device.');
    }
  }
  
}
