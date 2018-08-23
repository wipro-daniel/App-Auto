import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { hcPost } from '../hcpost.model'

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent {
  onAddPost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    const hcPost: hcPost = {
      appName: form.value.appName,
      hcParam: form.value.hcParam,
      hcDesc:form.value.hcDesc
    };
  }}
