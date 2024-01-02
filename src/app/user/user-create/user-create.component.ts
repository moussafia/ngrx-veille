import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as UserAction from '../state/user.action'
import { User } from '../user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit{

formSave?:FormGroup
constructor(private builder:FormBuilder,private store: Store<User>){}
ngOnInit(): void {
    this.formSave = this.builder.group({
      name:['',Validators.required],
      nationality:['',Validators.required]
    })
}
saveUser() {
  if(this.formSave?.valid){
    const user = this.formSave.value
    this.store.dispatch(UserAction.saveUser({user}))

  }
}

}
