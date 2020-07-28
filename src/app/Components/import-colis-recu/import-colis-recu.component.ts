import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelColis} from '../../Models/ExcelColis/excel-colis';
import {ColisRecu} from '../../Models/ColisRecu/colis-recu';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ColisRecuService} from '../../Services/colis-recu/colis-recu.service';
import {UserService} from '../../Services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './import-colis-recu.component.html',
  styleUrls: ['./import-colis-recu.component.scss']
})
export class ImportColisRecuComponent implements OnInit {

  public file: File;
  public arrayBuffer: any;
  public colis: ColisRecu[] = [];
  public sheetNames = [];
  public index: number = 0;
  public todayDate;
  public yesterdayDate;
  public beforeYesterdayDate;
  public isLoading;
  public isUploading;

  displayedColumns: string[] = ['id', 'nomExp', 'nomDest', 'nbr', 'regle', 'montant','actions'];
  dataSources: MatTableDataSource<ColisRecu>[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private colisRecuService: ColisRecuService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.todayDate = new Date();
    this.yesterdayDate = new Date();
    this.beforeYesterdayDate = new Date();
    this.yesterdayDate.setDate(this.todayDate.getDate() - 1);
    this.beforeYesterdayDate.setDate(this.todayDate.getDate() - 2);
    this.sheetNames.push(this.beforeYesterdayDate);
    this.sheetNames.push(this.yesterdayDate);
    this.sheetNames.push(this.todayDate);
    this.colisRecuService.getLastDays().subscribe((lastColis) => {
      for (let i = 0; i < 3; i++) {
        let dataSource = new MatTableDataSource<ColisRecu>(lastColis[i]);
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;
        this.dataSources.push(dataSource);
      }
      this.isLoading = false;
    });
  }

  onUpload(event) {
    this.isUploading = true;
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
      this.colis = [];
      var worksheet = workbook.Sheets[workbook.SheetNames[workbook.SheetNames.length - 1]];
      let excelColiscolis: ExcelColis[] = XLSX.utils.sheet_to_json<ExcelColis>(worksheet);
      let metaInfo = excelColiscolis.splice(0, 3);
      console.log(metaInfo);
      let expCity = metaInfo[1].__EMPTY_1.split(':')[1].trim();
      let destCity = metaInfo[1].__EMPTY_3.split(':')[1].trim();
      let date = metaInfo[1].__EMPTY_6.toString();
      this.sheetNames.push(date);
      console.log(expCity);
      console.log(destCity);
      console.log(date);
      excelColiscolis.map((excelColis) => {
        let id, nomExp, nomDest, nbr, regle, montant;
        if (excelColis.__EMPTY_1 != null) {
          id = excelColis.__EMPTY_1.toString().replace('e', '0');
          nomExp = excelColis.__EMPTY_2;
          nomDest = excelColis.__EMPTY_3;
          nbr = excelColis.__EMPTY_4.toString();
          regle = excelColis.__EMPTY_5;
          if (excelColis.__EMPTY_6 != null) {
            montant = excelColis.__EMPTY_6.toString();
          }
          this.colis.push(
            new ColisRecu(id, nomExp, nomDest, nbr, regle, montant, date));
        }
      });
      let dataSource = new MatTableDataSource<ColisRecu>(this.colis);
      console.log(this.colis.length);
      this.colisRecuService.addAll(this.colis).subscribe((colis) => {
        console.log(colis);
      this.isUploading=false;
      });
      dataSource.paginator = this.paginator;
      dataSource.sort = this.sort;
      this.dataSources.push(dataSource);
    };
  }

  applyFilter(event: Event) {
    let dataSource = this.dataSources[this.index];
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }


  tabChanged($event: MatTabChangeEvent) {
    let index = $event.index;
    let dataSource = this.dataSources[index];
    dataSource.paginator = this.paginator;
    dataSource.sort = this.sort;
    this.index = index;
  }

  logout() {
    this.userService.logout();
  }
}
