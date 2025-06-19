import { inject } from '@angular/core';
import { ThemeManagerService } from '../services/theme-manager.service';
import { TranslateManagerService } from '../services/translate-manager.service';
import { of, tap } from 'rxjs';

export const appInit = () => {
  const themeManager = inject(ThemeManagerService);
  const translateManager = inject(TranslateManagerService);
  return of(true).pipe(
    tap(() => {
      themeManager.initTheme();
      translateManager.initTranslate();
      console.log('App has Initialized successfully.');
    })
  );
};
