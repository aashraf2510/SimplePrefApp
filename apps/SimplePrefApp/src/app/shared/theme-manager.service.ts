import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { CookiesManagerService } from './cookies-manager.service';
import { Theme } from '../types/theme.type';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly themeKey = 'theme';
  private readonly darkClass = 'dark';
  private readonly root = inject(DOCUMENT);
  private readonly cookiesManager = inject(CookiesManagerService);
  private currentTheme = signal<Theme>('light');

  initTheme() {
    let theme = this.cookiesManager.getCookie(this.themeKey);
    // console.log('Theme ===>>> ', theme);
    if (theme) {
      this.setHTMLTheme(theme as Theme);
      this.setCurrentTheme(theme as Theme);
    }

    return of(theme).pipe(
      tap(() => {
        console.log(`Toggled Theme is  ==> ${theme}`);
      })
    );
  }

  setCurrentTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  getCurrentTheme() {
    return this.currentTheme();
  }

  toggleTheme() {
    const currentTheme = this.cookiesManager.getCookie(this.themeKey);
    let newTheme: Theme =
      currentTheme == 'light' || currentTheme == '' ? 'dark' : 'light';
    this.setCurrentTheme(newTheme);
    this.setHTMLTheme(newTheme);

    this.cookiesManager.setCookie(this.themeKey, newTheme, {
      isNeverExpire: true,
    });
  }

  setHTMLTheme(theme: Theme) {
    if (theme == 'light') {
      this.enableLightTheme();
    } else {
      this.enableDarkTheme();
    }
  }

  enableLightTheme() {
    this.root.documentElement.classList.remove(this.darkClass);
  }

  enableDarkTheme() {
    this.root.documentElement.classList.add(this.darkClass);
  }
}
