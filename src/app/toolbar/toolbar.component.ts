import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  pageTitle: string = '';
  userName: string = '';

  constructor(private router: Router, public titleService: TitleService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') ?? '{}');
    this.userName = user?.usuario ?? '';
  
  }
}
