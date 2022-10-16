import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private key: string = 'VaccineManagement0703';
  constructor() {}

  public storeData(name: string, value: string) {
    localStorage.setItem(name, this.encrypt(value));
  }
  public getData(name: string): string {
    return this.decrypt(localStorage.getItem(name) || '');
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

  // encrypting the data before storing in localStorage
  private encrypt(text: string): string {
    if (text == '') return '';
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }
  private decrypt(text: string): string {
    if (text == '') return '';
    return CryptoJS.AES.decrypt(text, this.key).toString(CryptoJS.enc.Utf8);
  }
}
