import { ThemeStorageService } from '@/shared/services/ThemeStorageService';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'theme-controller',
  imports: [],
  templateUrl: './theme-controller.html',
})
export class ThemeController implements OnInit{

  themeStorageService = inject(ThemeStorageService);

  lightTheme = signal(false);

  ngOnInit(): void {
    const theme = this.themeStorageService.loadFromlocalStorage();

    this.lightTheme.set((theme === 'emerald') ? true : false);
  }



  saveToLocalstorage(theme: string) {
    console.log(theme);

    this.themeStorageService.saveTolocalstorage(theme);

  }
}
