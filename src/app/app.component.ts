import { Component } from '@angular/core';
import {AuthService} from './services/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valid:boolean 
  invalid:boolean
  title ='VaccineMangement'

  
  constructor(public authService:AuthService){
    if (!this.authService.currentUser || this.authService.currentUser.userId===0){
      this.invalid = true
      this.valid= false
    }
    else{
      this.valid = true
      this.invalid = false
    }
    
  }
   
  }
  

