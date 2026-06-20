import ServicoDePagamento from "../src/trabalhoConclusao.js";
import assert from 'node:assert';

describe ('Testes classe de Pagamentos', () => {
    it ('Validar que o pagamento é adicionado à lista de pagamentos', () => { 
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.codigoBarras, '0987-7656-3475');
        assert.equal(pagamentos.empresa, 'Samar');
        assert.equal(pagamentos.valor, 156.87)
    })
    it ('Validar que o pagamento exibido é o último', () => { 
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        servicoDePagamento.pagar('0232-1133-4523', 'Netflix', 70.00);
        servicoDePagamento.pagar('0938-2311-1344', 'Disney', 180.98);
        servicoDePagamento.pagar('0255-2455-2211', 'Amazon', 300.50);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.codigoBarras, '0255-2455-2211');
        assert.equal(pagamentos.empresa, 'Amazon');
        assert.equal(pagamentos.valor, 300.50)
    })
    it ('Validar exibição correta da categoria Cara', () => { 
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.categoria, 'cara');
    })
     it ('Validar exibição correta da categoria Padrão', () => { 
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 50.00);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.categoria, 'padrão');
    })
})