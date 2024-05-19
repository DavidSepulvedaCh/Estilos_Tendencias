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
      { name: 'home', url: '../../../../assets/svg/home.svg' },
      { name: 'users', url: '../../../../assets/svg/users.svg' },
      { name: 'settings', url: '../../../../assets/svg/settings.svg' },
      { name: 'products', url: '../../../../assets/svg/store.svg' },
      { name: 'services', url: '../../../../assets/svg/collage.svg' },
      { name: 'logout', url: '../../../../assets/svg/logout.svg' },
      { name: 'save', url: '../../../../assets/svg/save.svg' },
      { name: 'edit', url: '../../../../assets/svg/edit.svg' },
      { name: 'delete', url: '../../../../assets/svg/trash.svg' },
      { name: 'lock-access', url: '../../../../assets/svg/lock-access.svg' },
      { name: 'user-delete', url: '../../../../assets/svg/user-delete.svg' },
      { name: 'facebook', url: '../../../../assets/svg/facebook.svg' },
      { name: 'instagram', url: '../../../../assets/svg/instagram.svg' },
      { name: 'github', url: '../../../../assets/svg/github.svg' },
      {
        name: 'shopping-cart-filled',
        url: '../../../../assets/svg/shopping-cart-filled.svg',
      },
      {
        name: 'shopping-cart',
        url: '../../../../assets/svg/shopping-cart.svg',
      },
      {
        name: 'lock-access-off',
        url: '../../../../assets/svg/lock-access-off.svg',
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
