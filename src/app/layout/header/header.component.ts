import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpenPopup = signal<boolean>(false);
  isOpenMune = signal<boolean>(false);

  openPopup() {
    this.isOpenPopup.set(!this.isOpenPopup());
  }
  openMune() {
    this.isOpenMune.set(!this.isOpenMune());
  }

}
