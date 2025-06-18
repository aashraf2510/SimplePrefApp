import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from '../../shared/services/theme-manager.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  themeVal: boolean = false;
  langVal: boolean = false;
  fetchIsDone = false;

  private readonly _themeManager = inject(ThemeManagerService);

  toggleTheme() {
    // this.themeVal = !this.themeVal;
    console.log(this.themeVal);
    this._themeManager.toggleTheme();
  }
  toggleLang() {
    // this.langVal = this.langVal == 'ar' ? 'en' : 'ar';
    console.log(`Language Now is :  ${this.langVal}`);
  }

  getUserPrefFromCookies() {
    const theme = this._themeManager.getCurrentTheme();
    console.log(theme);
    if (theme == 'dark') {
      this.themeVal = true;
    }
  }

  ngOnInit(): void {
    this._themeManager.initTheme();
    this.getUserPrefFromCookies();
  }
}
