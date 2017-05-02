import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../types';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() public observableData: Observable<Profile>;
  profile = new Profile({});

  constructor() { }

  ngOnInit() {
    this.observableData.subscribe(new_profile => {
      if (new_profile) {
        this.profile = new_profile;
      }
    })
  }

}
