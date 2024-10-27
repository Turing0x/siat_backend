export interface Consumption {
  ID: number;
  IdAgencia: number;
  IdMetroContador: number;
  NombreContador: string;
  Fecha: Date;
  Madrugada: number;
  Dia: number;
  Pico: number;
  Reactivo: number;
  DMax: number;
  PicoDiurno: number;
  Factor: number;
  ConsumoTotal: number;
}
