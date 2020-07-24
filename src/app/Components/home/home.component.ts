import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelColis} from '../../Models/ExcelColis/excel-colis';
import {Colis} from '../../Models/Colis/colis';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public file: File;
  public arrayBuffer: any;
  public colis: Colis[] = [];
  displayedColumns: string[] = ['id', 'nomExp', 'nomDest', 'nbr','regle','montant'];
  dataSource: MatTableDataSource<Colis>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() {
  }

  ngOnInit(): void {
    //TODO:Add Date Variable to Colis and at the import too
    console.log(firebase.firestore.Timestamp.now().toDate());
  }

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, {type: 'binary'});
      console.log(workbook.SheetNames);
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let excelColiscolis: ExcelColis[] = XLSX.utils.sheet_to_json<ExcelColis>(worksheet);
      excelColiscolis.splice(0,3);
      excelColiscolis.map((excelColis) => this.colis.push(
        new Colis(excelColis.__EMPTY_1, excelColis.__EMPTY_2, excelColis.__EMPTY_3,
          excelColis.__EMPTY_4, excelColis.__EMPTY_5, excelColis.__EMPTY_6)));
      console.log(this.colis);
      this.dataSource= new MatTableDataSource<Colis>(this.colis);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
