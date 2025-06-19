import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { CookiesManagerService } from './cookies-manager.service';
import { Lang } from '../types/lang.type';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateManagerService {
  private readonly langKey = 'lang';
  private readonly root = inject(DOCUMENT);
  private readonly cookiesManager = inject(CookiesManagerService);
  private currentLang = signal<Lang>('en');
  private readonly translateService = inject(TranslateService);

  initTranslate() {
    this.translateService.addLangs(['ar', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    let lang = this.cookiesManager.getCookie(this.langKey);

    if (lang) {
      this.setHTMLLang(lang as Lang);
      this.setCurrentLang(lang as Lang);
      this.translateService.setDefaultLang(lang);
      this.translateService.use(lang);
    }

    console.log(`Init Lang is  ==> ${lang}`);

    return this.translateService.use(lang || 'en').pipe(
      tap(() => {
        console.log(`Init Lang is  ==> ${lang}`);
      })
    );
  }

  toggleLanguage(): void {
    let currentLang = this.cookiesManager.getCookie(this.langKey);
    let newLang: Lang = currentLang == '' || currentLang == 'en' ? 'ar' : 'en';
    this.translateService.setDefaultLang(newLang);
    this.translateService.use(newLang);
    this.setCurrentLang(newLang);
    this.setHTMLLang(newLang);
    this.cookiesManager.setCookie(this.langKey, newLang, {
      isNeverExpire: true,
    });
  }

  getCurrentLang(): Lang {
    return this.currentLang();
  }

  setCurrentLang(lang: Lang): void {
    this.currentLang.set(lang);
  }

  setHTMLLang(lang: Lang): void {
    if (lang == 'ar') {
      this.root.documentElement.lang = 'ar';
      this.root.documentElement.dir = 'rtl';
    } else {
      this.root.documentElement.lang = 'en';
      this.root.documentElement.dir = 'ltr';
    }
  }
}
