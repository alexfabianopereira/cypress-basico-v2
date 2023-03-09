Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Manuely')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('manuely.reis@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

}) 