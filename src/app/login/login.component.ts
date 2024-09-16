import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import  {FormsModule} from '@angular/forms'
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule ,JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formValues={
    userName:null,
    password:null
  }
  submitted = false;
  handleSubmitForm(form:any){
    console.log(form); 
    this.submitted = true;
    if (form.valid) {
      console.log('Form Submitted!', this.formValues);
    }
  }
}
