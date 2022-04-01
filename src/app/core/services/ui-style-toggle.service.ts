import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./local-storage.service";


export enum ThemeMode {
  LIGHT,DARK, CUSTOM
}

@Injectable()
export class UiStyleToggleService {

  public theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.LIGHT);
  private readonly THEME_KEY = 'THEME';
  private readonly DARK_THEME_VALUE = 'DARK';
  private readonly CUSTOM_THEME_VALUE = 'CUSTOM';
  private readonly LIGHT_THEME_VALUE = 'LIGHT';
  private readonly LIGHT_THEME_CLASS_NAME = 'theme-light';
  private readonly DARK_THEME_CLASS_NAME = 'theme-dark';
  private readonly CUSTOM_THEME_CLASS_NAME = 'theme-custom';
  private darkThemeSelected = false;
  private customThemeSelected = false;
  private lightThemeSelected = false;

  constructor(private storage: StorageService) {

  }

  public setThemeOnStart() {
    if (this.isDarkThemeSelected()) {
      this.setDarkTheme();
    } else if (this.isLightThemeSelected()) {
      this.setLightTheme();
    } else {
      this.setCustomTheme();
    }
    setTimeout(() => {
      document.body.classList.add('animate-colors-transition');
    }, 500);
  }

  public toggle(theme: any) {
    if (theme == 'light') {
      this.lightThemeSelected = true;
      this.setLightTheme();
    }
    if (theme == 'dark') {
      this.darkThemeSelected = true;
      this.setDarkTheme();
    }
    if (theme == 'custom') {
      this.customThemeSelected = true;
      this.setCustomTheme();
    }
    // if (this.darkThemeSelected) {
    //   this.setLightTheme();
    // } else if (this.customThemeSelected) {
    //   this.setLightTheme();
    // } else {
    //   this.setDarkTheme();
    // }
  }

  private isDarkThemeSelected(): boolean {
    this.darkThemeSelected = this.storage.get(this.THEME_KEY) === this.DARK_THEME_VALUE;
    return this.darkThemeSelected;
  }

  private isLightThemeSelected(): boolean {
    this.lightThemeSelected = this.storage.get(this.THEME_KEY) === this.DARK_THEME_VALUE;
    return this.lightThemeSelected;
  }

  private isCustomThemeSelected(): boolean {
    this.customThemeSelected = this.storage.get(this.THEME_KEY) === this.CUSTOM_THEME_VALUE;
    return this.customThemeSelected;
  }

  private setLightTheme() {
    this.storage.set(this.THEME_KEY, this.LIGHT_THEME_VALUE);
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    document.body.classList.remove(this.CUSTOM_THEME_CLASS_NAME);
    document.body.classList.add(this.LIGHT_THEME_CLASS_NAME);
    this.darkThemeSelected = false;
    this.lightThemeSelected = true;
    this.customThemeSelected = false;
    this.theme$.next(ThemeMode.LIGHT);
  }

  private setDarkTheme() {
    this.storage.set(this.THEME_KEY, this.DARK_THEME_VALUE);
    document.body.classList.remove(this.LIGHT_THEME_CLASS_NAME);
    document.body.classList.remove(this.CUSTOM_THEME_CLASS_NAME);
    document.body.classList.add(this.DARK_THEME_CLASS_NAME);
    this.customThemeSelected = false;
    this.lightThemeSelected = false;
    this.darkThemeSelected = true;
    this.theme$.next(ThemeMode.DARK);
  }

  private setCustomTheme() {
    this.storage.set(this.THEME_KEY, this.CUSTOM_THEME_VALUE);
    document.body.classList.remove(this.LIGHT_THEME_CLASS_NAME);
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    document.body.classList.add(this.CUSTOM_THEME_CLASS_NAME);
    this.customThemeSelected = true;
    this.lightThemeSelected = false;
    this.darkThemeSelected = false;
    this.theme$.next(ThemeMode.CUSTOM);
  }

}
