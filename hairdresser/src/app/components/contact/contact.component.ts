import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63344.92635097164!2d-73.17417806304654!3d7.119289350021959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157af751c0ed%3A0x75a0e4551148c36c!2sBucaramanga%2C%20Santander!5e0!3m2!1ses-419!2sco!4v1705766455228!5m2!1ses-419!2sco");
  }
}
