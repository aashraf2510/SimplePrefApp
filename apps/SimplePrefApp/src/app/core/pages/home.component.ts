import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Theme } from '../../types/theme.type';
import { Lang } from '../../types/lang.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ToggleButtonModule, ToggleSwitchModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  themeVal: boolean = false;
  langVal: Lang = 'en';

  toggleTheme() {
    // this.themeVal = !this.themeVal;
    console.log(this.themeVal);
  }
  toggleLang() {
    this.langVal = this.langVal == 'ar' ? 'en' : 'ar';
  }

  getUserPrefFromCookies() {}

  ngOnInit(): void {
    this.getUserPrefFromCookies();
  }
}
