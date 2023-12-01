describe('Teste aplicação app-conversor de moedas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('verifica componente header', () => {
    cy.get('app-header').should('be.visible')
  })

  it('verifica componente card', () => {
    cy.get('app-card').should('be.visible')
  })
})
