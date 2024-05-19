// icon-registry.service.ts
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    const icons = [
      { name: 'home', url: 'src/assets/svg/home.svg' },
      { name: 'users', url: 'src/assets/svg/users.svg' },
      { name: 'settings', url: 'src/assets/svg/settings.svg' },
      { name: 'products', url: 'src/assets/svg/store.svg' },
      { name: 'services', url: 'src/assets/svg/collage.svg' },
      { name: 'logout', url: 'src/assets/svg/logout.svg' },
      { name: 'save', url: 'src/assets/svg/save.svg' },
      { name: 'edit', url: 'src/assets/svg/edit.svg' },
      { name: 'delete', url: 'src/assets/svg/trash.svg' },
      {
        name: 'lock-access',
        url: 'src/assets/svg/lock-access.svg',
      },
      {
        name: 'user-delete',
        url: 'src/assets/svg/user-delete.svg',
      },
      { name: 'facebook', url: 'src/assets/svg/facebook.svg' },
      { name: 'instagram', url: 'src/assets/svg/instagram.svg' },
      { name: 'github', url: 'src/assets/svg/github.svg' },
      {
        name: 'shopping-cart-filled',
        url: 'src/assets/svg/shopping-cart-filled.svg',
      },
      {
        name: 'shopping-cart',
        url: 'src/assets/svg/shopping-cart.svg',
      },
      {
        name: 'lock-access-off',
        url: 'src/assets/svg/lock-access-off.svg',
      },
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
