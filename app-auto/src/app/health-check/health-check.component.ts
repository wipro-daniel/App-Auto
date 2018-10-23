import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { hcPost } from '../hcpost.model'
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})


export class HealthCheckComponent {
  constructor(private _searchService: SearchService) {
  }
  onAddPost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this._searchService.postHcData(form.value.appName,form.value.hcParam,form.value.hcDesc,form.value.hcStatus);
/*     const hcPost: hcPost = {
      appName: form.value.appName,
      hcParam: form.value.hcParam,
      hcDesc:form.value.hcDesc
    }; */

    
  }}
