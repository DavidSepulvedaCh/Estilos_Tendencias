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
      { name: 'home', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/home.svg' },
      { name: 'users', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/users.svg' },
      { name: 'settings', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/settings.svg' },
      { name: 'products', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/store.svg' },
      { name: 'services', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/collage.svg' },
      { name: 'logout', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/logout.svg' },
      { name: 'save', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/save.svg' },
      { name: 'edit', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/edit.svg' },
      { name: 'delete', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/trash.svg' },
      { name: 'lock-access', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/lock-access.svg' },
      { name: 'user-delete', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/user-delete.svg' },
      { name: 'facebook', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/facebook.svg' },
      { name: 'instagram', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/instagram.svg' },
      { name: 'github', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/github.svg' },
      {
        name: 'shopping-cart-filled', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/shopping-cart-filled.svg',
      },
      {
        name: 'shopping-cart', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/shopping-cart.svg',
      },
      {
        name: 'lock-access-off', url: 'Estilos_Tendencias/hairdresser/src/assets/svg/lock-access-off.svg',
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
