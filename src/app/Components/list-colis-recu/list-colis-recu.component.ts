import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ColisRecu} from '../../Models/ColisRecu/colis-recu';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ColisRecuService} from '../../Services/colis-recu/colis-recu.service';
import {UserService} from '../../Services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-colis-recu.component.html',
  styleUrls: ['./list-colis-recu.component.scss']
})
export class ListColisRecuComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomExp', 'nomDest', 'nbr', 'regle', 'montant','actions'];
  dataSource;
  public allColis: ColisRecu[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private colisRecuService: ColisRecuService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.colisRecuService.findAll().subscribe((allColis) => {
      this.allColis = allColis;
      this.dataSource = new MatTableDataSource<ColisRecu>(allColis);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout() {
    this.userService.logout();
  }
}
