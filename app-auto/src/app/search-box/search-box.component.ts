import { Component, OnInit, Input, ViewChild, Sanitizer } from '@angular/core';
import { NgForm } from '@angular/forms'
import {
  MatTableDataSource,
  MatPaginator,
  //prav  MatIconRegistry,
  MatSort,
  MatRadioChange
} from '@angular/material';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBox {
  errorMessage: string;
  fullResults: string[];
  searchString = '';
  searchResults: any[];
  ticketSpecificResult:any[];//this variable is used to hit straight ticket data rather than generic one
  headerKeys: any[];
  hasSearchResults = false;
  searchSpinner = false;
  suggestions: any[];
  ticketString: any;
  ticketSltVal: boolean;
  ticketSbmtVal: boolean;
  selectedResult: any = [];
  selectedAppResult = '';
  ticketSbmtStr='';
  ticketlabel=[];

  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _searchService: SearchService) {
  }


  onSearch(): void {
    this.errorMessage = '';
    this.fullResults = [];
    this.headerKeys = [];
    this.ticketString = '';
    this.ticketSltVal = true;
    this.ticketSbmtVal = true;
    this.ticketlabel=[];

    if (this.searchString.trim() === '') {
      this.errorMessage = 'Search field cannot be blank';
      return;
    }

    this._searchService.getSearchResults(this.searchString);

    this._searchService.searchResult.subscribe(
      data => {
        this.fullResults = data;
        //  console.log(JSON.stringify(this.fullResults));
        this.ticketString = <any>this.fullResults;
        //this.ticketString=this.fullResults;
        //checking the string whether this is for HC or ticket
        // console.log(this.ticketString);
        if (this.fullResults.length > 0) {
          this.filterSearch();
        }
  /*   if (this.ticketString  ) {
      console.log(`Able to Capture undefined`);
          this.ticketSearch();
        }  */
     this.ticketSearch();
      });
  }

  ticketSearch() {
    //This function is called when ticket data is sent across. Need to corrcet main function so that ticket data is explicitly checked
 this.ticketSpecificResult = this.ticketString['SPRITE'];
    if (this.ticketSpecificResult !== undefined){
      //Object.keys will enumarate the object into array hence it provides then length
     // console.log(Object.keys(this.ticketSpecificResult).length);
     //console.log(this.ticketSpecificResult[0]["Labels"]);
     this.ticketlabel=this.ticketSpecificResult[0]["Labels"]
    }
  
  }
//Sprite Ticket for contract status change
  onSbmtTkt(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this._searchService.postSprTkt(form.value.sprCde,form.value.sprStsCde);
    }

  buildHeaderKeys(results: any[]): string[] {
    let obj: any;
    let count = 0;
    const keys: string[] = [];
    // if (typeof this.headerKeys === 'undefined' || this.headerKeys.length === 0) {
    if (results.length > 0) {
      for (obj of results) {
        let key: any;
        for (key in obj) {
          if (key !== '') {
            keys.push(key);
            count++;
          }
        }
        if (count > 0) {
          break;
        }
      }
    }
    // }
    // console.log(keys);
    return keys;
  }

  onSelectionChange(idx) {
    this.selectedResult = this.ticketString["Options"][idx]["SELECT"][0];
   //console.log(JSON.stringify(this.selectedResult));
  }

  onAppChange(idx) {
    this.selectedAppResult = this.selectedResult["Options"][idx]["SELECT"];
  }

  ticketSubmit() {
 //   this.ticketSbmtVal = true;
 this.ticketSbmtStr='Data processed successfully';
// console.log(`${this.ticketSbmtStr}`)
   
  }

  filterSearch() {
    this.hasSearchResults = false;
    if (this.fullResults.length > 0) {
      let searchArr: string[];
      if (this.searchString.trim() === '') {
        this.errorMessage = 'Search field cannot be blank';
        return;
      }
     // console.log(this.fullResults[0]['GREEN'].length);
      if (this.fullResults[0]['GREEN'] === undefined){
      this.searchResults = this.fullResults[0]['RED'];
    }
      else  {
        this.searchResults = this.fullResults[0]['GREEN'];
      } 

      this.headerKeys = this.buildHeaderKeys(this.searchResults);
      this.searchString = '';
      if (this.searchResults && this.searchResults.length > 0) {
        this.dataSource = new MatTableDataSource<any[]>(this.searchResults);

      }
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

