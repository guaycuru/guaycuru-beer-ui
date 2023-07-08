import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UnauthorizedError } from '../models/errors.model';

@Injectable()
export class AlertService {

  constructor(private toastrService: ToastrService) {
  }

  public info(msg: string, title?: string): void {
    const config = {positionClass: 'toast-top-center', closeButton: true, timeOut: 0};
    this.toastrService.info(msg, title, config);
  }

  public success(msg: string, title?: string): void {
    const config = {timeOut: 3000, positionClass: 'toast-top-center'};
    this.toastrService.success(msg, title, config);
  }

  public warning(msg: string, title?: string): void {
    const config = {positionClass: 'toast-top-center', closeButton: true, timeOut: 0};
    this.toastrService.warning(msg, title, config);
  }

  public error(title: string, error?: string | any): void {
    let message: string;
    let details: string[];

    if(error) {
      if(typeof error === 'string') {
        message = error;
      } else if(error instanceof UnauthorizedError) {
        message = "You are not authorized to perform the requested action.";
      } else if(error.message) {
        message = error.message;
        details = error.details;
      }
    }

    if(!message) {
      message = title;
    }

    if(details && details.length > 0) {
      message += '<ul>';
      details.forEach(detail => message += `<li>${detail}</li>`);
      message += '</ul>';
    }

    const config = {
      positionClass: 'toast-top-center',
      timeOut: 0,
      enableHtml: true,
      closeButton: true,
      tapToDismiss: false
    };
    this.toastrService.error(message, title, config);
  }

  public clear(): void {
    this.toastrService.clear();
  }
}
