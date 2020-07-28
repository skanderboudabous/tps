import {Component, OnInit} from '@angular/core';
import {ColisExpService} from '../../Services/colis-exp/colis-exp.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateFormatPipe} from '../../Pipes/DateFormatPipe/date-format.pipe';

@Component({
  selector: 'app-add-colis-exp',
  templateUrl: './add-colis-exp.component.html',
  styleUrls: ['./add-colis-exp.component.scss']
})
export class AddColisExpComponent implements OnInit {
  public id: string;
  public formGroup: FormGroup;

  constructor(private colisExpService: ColisExpService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dateFormatPipe: DateFormatPipe,
              private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let date = new Date();
    console.log(this.dateFormatPipe.transform(date.toLocaleString()));
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.id = id;
        this.colisExpService.getOne(this.id).subscribe((colisExp) => {
          if (colisExp != null) {
            this.formGroup = this.formBuilder.group({
              id: [colisExp.id, [Validators.required]],
              nomExp: [colisExp.nomExp, Validators.required],
              nomDest: [colisExp.nomDest, Validators.required],
              nbr: [colisExp.nbr, Validators.required],
              regle: [colisExp.regle, Validators.required],
              montant: [colisExp.montant, Validators.required],
              numDest: [colisExp.numDest, Validators.required, Validators.minLength(8), Validators.maxLength(8)],
            });
          } else {
            this.initForm();
          }
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      nomExp: ['', Validators.required],
      nomDest: ['', Validators.required],
      nbr: ['', Validators.required],
      regle: ['', Validators.required],
      montant: ['', Validators.required],
      numDest: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  get f() {
    return this.formGroup.controls;
  }


  public submit(form) {
    let colisExp = Object.assign({}, form.value);
    let date = new Date();
    colisExp.date = this.dateFormatPipe.transform(date.toLocaleString());
    if (this.id) {
      this.colisExpService.update(this.id, colisExp).subscribe(user => this.router.navigate(['/colisexp/list']));
      this._snackBar.open('Colis modifié', 'ok', {
        duration: 2000,
      });
    } else {
      this.colisExpService.add(colisExp).subscribe(user => this.router.navigate(['/colisexp/list']));
    }

  }

  getNumDestErrorMessages() {
    if (this.f.numDest.touched) {
      if (this.f.numDest.hasError('minlength') || this.f.numDest.hasError('maxlength')) {
        return 'Le numéro doit comporter exacte 8 numéros';
      }
      if (this.f.numDest.hasError('required')) {
        return 'Vous devez saisir une le numero de d\'estinatire';
      }
      return '';
    }
  }

  getMontantErrorMessages() {
    if (this.f.montant.touched) {
      if (this.f.montant.hasError('required')) {
        return 'Vous devez saisir un montant';
      }
    }
  }

  getRegleErrorMessages() {
    if (this.f.regle.touched) {
      if (this.f.regle.hasError('required')) {
        return 'Vous devez saisir la regle';
      }
    }
  }

  getNbrErrorMessages() {
    if (this.f.nbr.touched) {
      if (this.f.nbr.hasError('required')) {
        return 'Vous devez saisir le nombre';
      }
    }
  }

  getNomDestErrorMessages() {
    if (this.f.nomDest.touched) {
      if (this.f.nomDest.hasError('required')) {
        return 'Vous devez saisir le nom de déstinataire';
      }
    }
  }

  getNomExpErrorMessages() {
    if (this.f.nomExp.touched) {
      if (this.f.nomExp.hasError('required')) {
        return 'Vous devez saisir le nom d\'exportrice;';
      }
    }
  }

  getIdErrorMessages() {
    if (this.f.id.touched) {
      if (this.f.id.hasError('required')) {
        return 'Vous devez saisir un numero de bon';
      }
    }
  }

  numberOnly(event:KeyboardEvent): boolean {
    const charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
