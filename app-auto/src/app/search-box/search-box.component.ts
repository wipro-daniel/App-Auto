import { Component, OnInit, Input, ViewChild, Sanitizer } from '@angular/core';

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
        console.log(this.fullResults);
        if (this.fullResults.length > 0) {
          this.filterSearch();
        }
        else if (this.ticketString.length > 0) {
          this.ticketSearch();
        }
      });

  }

  ticketSearch() {
    console.log(`Reached to the ticket function`);
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
    console.log(JSON.stringify(this.selectedResult));
  }

  onAppChange(idx) {
    this.selectedAppResult = this.selectedResult["Options"][idx]["SELECT"];
  }

  ticketSubmit() {
 //   this.ticketSbmtVal = true;
 this.ticketSbmtStr='Data processed successfully';
 console.log(`${this.ticketSbmtStr}`)
   
  }

  filterSearch() {

    this.hasSearchResults = false;
    if (this.fullResults.length > 0) {
      let searchArr: string[];
      if (this.searchString.trim() === '') {
        this.errorMessage = 'Search field cannot be blank';
        return;
      }

      console.log(this.fullResults);

      this.searchResults = this.fullResults[0]['BILLIT'];
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

