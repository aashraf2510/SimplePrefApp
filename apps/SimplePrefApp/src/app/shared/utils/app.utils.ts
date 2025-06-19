import { inject } from '@angular/core';
import { ThemeManagerService } from '../services/theme-manager.service';
import { TranslateManagerService } from '../services/translate-manager.service';
import { forkJoin } from 'rxjs';

export const appInit = () => {
  const themeManager = inject(ThemeManagerService);
  const translateManager = inject(TranslateManagerService);
  return forkJoin([themeManager.initTheme(), translateManager.initTranslate()]);
};
