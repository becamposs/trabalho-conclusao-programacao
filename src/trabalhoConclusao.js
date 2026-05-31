export default class ServicoDePagamento {
    constructor(){
        this.listaPagamentos = [];     
    }
    pagar(valor1, valor2, valor3){
        this.listaPagamentos.push({
            codigoBarras: valor1,
            empresa: valor2,
            valor: valor3,
            categoria: valor3 > 100 ? 'Cara' : 'Padrão'
        })
    }
    consultarUltimoPagamento(){
        return this.listaPagamentos.at(-1)
    }
}