export class ColisRecu {
  constructor(
    public id: string,
    public nomExp: string,
    public nomDest: string,
    public nbr: string,
    public regle: string,
    public montant: string,
    public date: string,
    public numDest?: string,
    public etat?: string
  ) {
  }
}
