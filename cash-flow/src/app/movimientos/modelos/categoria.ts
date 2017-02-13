import { Tipo } from './tipo';
export class Categoria extends Tipo {
  constructor(
    public id: number,
    public texto: string,
    public tipo: number) {
    super(id, texto);
  }
}
