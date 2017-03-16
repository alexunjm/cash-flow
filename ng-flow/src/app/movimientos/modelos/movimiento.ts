/** Clase para crear objetos de tipo Movimiento */
export class Movimiento {
  constructor(
    public fecha: Date,
    public importe: number,
    public tipo: number,
    public categoria: number,
    public _id?: string,
    public usuario?: string) {
  }
}
