import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import {User} from '../models/user'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
        this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });

  }

}
