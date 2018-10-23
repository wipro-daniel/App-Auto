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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getResults().subscribe(
      (tickets) => {
        this.tickets = <any>tickets;
        let redTickets = [];
        let greenTickets = [];
        let redTicketsCount = 0;
        let greenTicketsCount = 0;

        let data: any;

        redTickets = tickets.filter(ticket => ticket['Result Colour'] === 'Red');
        greenTickets = tickets.filter(ticket => ticket['Result Colour'] === 'Green');

        redTicketsCount = redTickets.length;
        greenTicketsCount = greenTickets.length;

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

        this.chart = new Chart('pie', {
          type: 'pie',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });

      });
  }
}
