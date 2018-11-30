import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { hcPost } from '../hcpost.model'
import { SearchService } from '../services/search.service';
import { DashboardService } from '../services/dasboard/dashboard.service';
import { $ } from 'protractor';


@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})

export class HealthCheckComponent {
  tickets: any;
  hcFailedAppSumm=[];
  redTicket:any;
  constructor(private _searchService: SearchService,
    private _dashBoardService: DashboardService) {
  }


  ngOnInit() {
    /* this.dashboardService.getResults().subscribe(
      (tickets) => {} */
  }

  toAddData() {
    this._dashBoardService.getResults().subscribe(
      (tickets) => {
        this.tickets = <any>tickets;
        let redTickets = [];
      this.hcFailedAppSumm = [];

        redTickets = tickets.filter(ticket => ticket['Result Colour'] === 'R');
        redTickets.forEach(redTicket => {
          if (this.hcFailedAppSumm.indexOf(redTicket['Application name']) >= 0) {
            return;
          }
          const appCount = redTickets.filter(ticket =>
            ticket['Application name'] === redTicket['Application name']);
          this.hcFailedAppSumm.push(redTicket['Application name']);
           });
      //  console.log(this.hcFailedAppSumm);
      });

      }

      getHcData(appName:string){
        console.log(appName);
      }

  onAddPost(form: NgForm) {

        if(form.invalid) {
          return;
        }
    this._searchService.postHcData(form.value.appName, form.value.hcParam, form.value.hcDesc, form.value.hcStatus);
        /*     const hcPost: hcPost = {
              appName: form.value.appName,
              hcParam: form.value.hcParam,
              hcDesc:form.value.hcDesc
            }; */


      }}
