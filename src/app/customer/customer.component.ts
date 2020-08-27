import { Component, OnInit } from '@angular/core';
import { Observable, from} from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http-service';
import { MessageService } from '../message-service';
import {HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  message: any;
  customerForm: FormGroup;
  submitted = false;

  addUrl = 'customer-service/api/message/getMessage';
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]]
      
    });
  }
 
  getMessage(): void {

    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.message = this.customerForm.get("name").value;
    this.httpService.get(this.addUrl+'/'+this.message, ).subscribe(res => {
     
      if (res.status == 'ok') {
      this.messageService.add(res.message);
      }
    },
    (err:HttpErrorResponse) => {                              
    
      if (err.name == 'HttpErrorResponse') {
        this.messageService.add("Customer Service is Stoped");
      }
      
    }
  )
  }



}
