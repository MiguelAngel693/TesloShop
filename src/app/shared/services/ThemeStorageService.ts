import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {

  saveTolocalstorage(theme: string) {
    const currentTheme = this.loadFromlocalStorage();

    if (!currentTheme) {
      this.saveTolocalstorage(theme);
      return;
    }

    if (currentTheme === 'dark')
      localStorage.setItem('theme', 'emerald');

    if (currentTheme === 'emerald')
      localStorage.setItem('theme', 'dark');
  }

  loadFromlocalStorage() {
    const theme = (localStorage.getItem('theme'));
    return theme;
  }
}
