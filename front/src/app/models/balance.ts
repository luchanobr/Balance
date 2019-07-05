export class Balance {

    constructor ( public usuario_id: number, public monto: number, public fecha: Date, public concepto: string, public forma: string, public balance_id?: number) {
        this.balance_id = balance_id;
        this.usuario_id = usuario_id;
        this.monto = monto;
        this.fecha = fecha;
        this.concepto = concepto;
        this.forma = forma;
    }
}
