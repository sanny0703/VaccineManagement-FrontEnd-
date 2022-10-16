import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toast: NgToastService) {}
  public notifySuccess(msg: string) {
    this.toast.success({
      detail: 'Success',
      summary: msg,
      duration: 5000,
    });
  }
  public notifyError(msg: string) {
    this.toast.error({
      detail: 'Oops',
      summary: msg,
      duration: 5000,
    });
  }
}
