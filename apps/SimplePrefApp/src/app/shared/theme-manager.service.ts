import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { CookiesManagerService } from './cookies-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly root = inject(DOCUMENT);
  private readonly cookiesManager = inject(CookiesManagerService);

  initTheme() {}
}
