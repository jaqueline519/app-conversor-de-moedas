describe('Test currency converter app', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Validate error screen', { defaultCommandTimeout: 6000 }, () => {
    cy.intercept('GET', 'https://economia.awesomeapi.com.br/last/*', {
      statusCode: 500,
      body: 'Erro interno do servidor',
    }).as('apiRequest');
    cy.visit('/currency-converter')
    cy.wait('@apiRequest')

    cy.get('.dolar > .card > .align > p.color-gray').should('contain.text', 'Algo deu errado');

    cy.intercept('GET', 'https://economia.awesomeapi.com.br/last/*', {statusCode: 200}).as('apiRequestSuccess');

    cy.get('.dolar > .card > .align > button.color-gray').should('be.visible').wait(1000).click();

    cy.wait('@apiRequestSuccess')
    cy.screenshot()
    cy.reload()
  })

  it('check header component', () => {
    cy.visit('/currency-converter');
    cy.get('header').should('be.visible')
    cy.screenshot()
  })


  it('check loading visibility', () => {
    cy.visit('/currency-converter');
    cy.get('app-card').should('be.visible')
    cy.get('.dolar > .card > [data-cy="loading"] > img').should('be.visible')
    cy.screenshot()
  })

  it('checks card information cisualization', () => {
    cy.visit('/currency-converter');
    cy.get('.dolar > .card > .card-header > h2').should('contain.text', 'Dólar Canadence')
    cy.get('.peso > .card > .card-header > h2').should('contain.text', 'Peso Argentino')
    cy.get('.libra > .card > .card-header > h2').should('contain.text', 'Libra Esterlina')
    cy.get('.dolar > .card > .card-footer > :nth-child(1) > span').should('be.visible');
    cy.get('.dolar > .card > .card-footer > :nth-child(1) > span').should('be.visible');
    cy.get('.peso > .card > .card-footer > :nth-child(1) > span').should('be.visible');
    cy.get('.peso > .card > .card-footer > :nth-child(2) > span').should('be.visible');
    cy.get('.libra > .card > .card-footer > :nth-child(1) > span').should('be.visible');
    cy.get('.libra > .card > .card-footer > :nth-child(1) > span').should('be.visible');
    cy.screenshot()
  })

})

