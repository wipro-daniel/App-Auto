import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dasboard/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickets: any;
  chart = [];
  redChart = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getResults().subscribe(
      (tickets) => {
        this.tickets = <any>tickets;
        let redTickets = [];
        let greenTickets = [];
        //prav-s
        let hcFailedApp = [];
        let hcFailedAppCount = [];
        let hcBackgroundColor = [];
        //prav-e
        let redTicketsCount = 0;
        let greenTicketsCount = 0;

        let data: any;
        let redData: any;

        redTickets = tickets.filter(ticket => ticket['Result Colour'] === 'R');
        greenTickets = tickets.filter(ticket => ticket['Result Colour'] === 'G');
        //prav-s

        redTickets.forEach(redTicket => {
          if (hcFailedApp.indexOf(redTicket['Application name']) >= 0) {
            return;
          }

          const appCount = redTickets.filter(ticket =>
            ticket['Application name'] === redTicket['Application name']);
          hcFailedApp.push(redTicket['Application name']);
          hcFailedAppCount.push(appCount.length);
          hcBackgroundColor.push('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16).substr(1, 6));
        });

     /*    console.log(hcFailedApp);
        console.log(hcFailedAppCount);
        console.log(hcBackgroundColor); */

        //prav-e
        redTicketsCount = redTickets.length;
        greenTicketsCount = greenTickets.length;

        Chart.defaults.global.responsive = true;
        Chart.defaults.global.animationSteps = 50;
        Chart.defaults.global.tooltipYPadding = 16;
        Chart.defaults.global.tooltipCornerRadius = 0;
        Chart.defaults.global.tooltipTitleFontStyle = "normal";
        Chart.defaults.global.tooltipFillColor = "white";
        Chart.defaults.global.animationEasing = "easeOutBounce";
        Chart.defaults.global.scaleLineColor = "black";
        Chart.defaults.global.scaleFontSize = 16;
        Chart.defaults.global.showScale = false;
        Chart.defaults.global.pointDotStrokeWidth = 2;

        data = {
          datasets: [{
            data: [redTicketsCount, greenTicketsCount],
            backgroundColor: ['Red', 'Green']
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'Red',
            'Green'
          ]
        };

        redData = {
          datasets: [{
            data: hcFailedAppCount,
            backgroundColor: hcBackgroundColor
          }],

          labels: hcFailedApp
        };

        this.chart = new Chart('pie', {
          type: 'pie',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: "Health Check",
              position: "bottom",
              fontSize: 16
            }
          }
        });

        this.redChart = new Chart('redPie', {
          type: 'pie',
          data: redData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: "Applications that need help!",
              position: "bottom",
              fontSize: 16
            }
          }
        });
      });
  }
}
