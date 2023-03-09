/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function() {
        const longText = "teste, teste, teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste"
        cy.get('#firstName').type('Manuely')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('manuely.reis@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function() {
        cy.get('#firstName').type('Manuely')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('manuely.reis@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio com valor nao numerico', function () {
       cy.get('#phone')
          .type('asdfferfff')
          .should('have.value', '')     
    
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function() {
        cy.get('#firstName').type('Manuely')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('manuely.reis@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible') 
    })

    it('preenche e limpa os campos nome sobrenome email e telefone',function() {
        cy.get('#firstName')
        .type('Manuely')
        .should('have.value', 'Manuely')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Reis')
        .should('have.value', 'Reis')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('manuely.reis@exemplo.com')
        .should('have.value', 'manuely.reis@exemplo.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('12345678')
        .should('have.value', '12345678')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible') 

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
             .select('YouTube')
             .should('have.value', 'youtube')

    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
             .select('mentoria')
             .should('have.value', 'mentoria')

    })
    
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
             .select(1)
             .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function() {
       cy.get('input[type="radio"][value="feedback"]')
         .check()
         .should('have.value', 'feedback')

    })

    it('marca o tipo de atendimento ', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
 
     })

     it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')        
          
    })
 
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')      
        .should('not.have.value')  
        .selectFile('./cypress/fixtures/example.json')
    })

    it('clicar formulario', function() {
        cy.get('#privacy a') .should('have.attr', 'target', '_blank')  
        
    })

    it('clicar formulario mesma pagina', function() {
        cy.get('#privacy a') 
          .invoke('removeAttr', 'target') 
          .click()

        cy.contains('Talking About Testing').should('be.visible')
        
    })

})
  