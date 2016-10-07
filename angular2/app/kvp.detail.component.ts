import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { KvpService } from './kvp.service';

@Component({
	moduleId: module.id,
  selector: 'kvp.detail',
  templateUrl: 'kvp.detail.component.html',
})
export class KvpDetailComponent {
	title = 'detail of detail';
	key = '';
	value = '';
	constructor(
		private kvpService: KvpService, 
		private location: Location,
		private router: Router) {}
	goBack(): void {
    this.location.back();
  }
  returnTo(): void {
    this.router.navigate(['/kvp']);
  }
  getUsers(): void {
  	this.kvpService.getUsers().then(kv => {
  		this.key = kv.key
  		this.value = kv.value
  	});
  }
}