import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Início');
  }


}
