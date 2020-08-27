import { Component, OnInit } from '@angular/core';
import { Observable, from} from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http-service';
import { MessageService } from '../message-service';
import {HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  greet: any;
  productForm: FormGroup;
  submitted = false;

  greetUrl = 'product-service/api/greet/greeting';
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]]
      
    });
  }
 
  getGreeting(): void {

    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.greet = this.productForm.get("name").value;
    this.httpService.get(this.greetUrl+'/'+this.greet, ).subscribe(res => {
     
      if (res.status == 'ok') {
      this.messageService.add(res.message);
      }
    },
    (err:HttpErrorResponse) => {                              
     if (err.name == 'HttpErrorResponse') {
        this.messageService.add("Product Service is Stoped");
      }
      
    }
  )
  }



}
