import { Component, OnInit } from '@angular/core';
import {Colisexp} from '../../Models/ColisExp/colis-exp';
import {ColisExpService} from '../../Services/colis-exp/colis-exp.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogueComponent} from '../confirm-dialogue/confirm-dialogue.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-colis-exp',
  templateUrl: './list-colis-exp.component.html',
  styleUrls: ['./list-colis-exp.component.scss']
})
export class ListColisExpComponent implements OnInit {

  private colisexpe: Colisexp [];
  public dataSource:any;
  displayedColumns: string[] = ['nomExp', 'nomDest', 'nbr', 'regle', 'montant', 'numDest', 'etat'];

  constructor(private colisExpService: ColisExpService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadcolisexpe();
  }


  loadcolisexpe() {
    this.colisExpService.getAll().subscribe((colisAll) => {
      this.colisexpe = colisAll;
      this.dataSource = new MatTableDataSource(colisAll);
    });
  }

  deleteColisexpe(identifient: string) {
    const id = this.colisexpe.filter(colisexp => colisexp.id === identifient)[0].id;
    const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      width: '250px',
      data: {message: 'voulez-vous supprimer ?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.colisExpService.delete(id)
        .subscribe(
          data => {
            console.log(data);
            this.loadcolisexpe();
          },
          error => console.log(error));
    });

  }

}
