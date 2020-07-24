export class Colis {
  constructor(
    public id:string,
    public nomExp:string,
    public nomDest:string,
    public nbr:string,
    public regle:string,
    public montant:number,
    public numDest?:string,
    public etat?:string
  ) {
  }
}
