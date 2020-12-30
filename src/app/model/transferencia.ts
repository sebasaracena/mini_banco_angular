export interface Transferencia {
  cuenta_origen?: string;
  cuenta_destino?: string;
  monto?: number;
  saldo?:number;
  saldo_trans_entrante?:number;
  tipo?: string;
}
