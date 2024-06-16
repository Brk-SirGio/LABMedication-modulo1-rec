import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title: string = '';

  getTitle(): string {
    return this.title;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }
}
