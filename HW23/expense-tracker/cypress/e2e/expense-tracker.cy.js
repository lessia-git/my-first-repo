describe('Expense Tracker App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the app header and zero balance on load', () => {
    cy.contains('h2', 'Expense Tracker App').should('be.visible');
    cy.contains('h4', 'Current Balance').should('be.visible');
    cy.get('#balance').should('contain', '$0.00');
    cy.contains('h4', 'Income').should('be.visible');
    cy.contains('h4', 'Expense').should('be.visible');
    cy.get('.money.plus').should('contain', '0.00');
    cy.get('.money.minus').should('contain', '0.00');
  });

  it('adds an income transaction and updates balance', () => {
    cy.get('#description').type('Salary');
    cy.get('#transactionamount').type('1000');
    cy.contains('button', 'Add Transaction').click();

    cy.get('.list li').should('have.length', 1);
    cy.get('.list li').first().should('contain', 'Salary').and('contain', '+$1000');
    cy.get('#balance').should('contain', '$1000.00');
    cy.get('.money.plus').should('contain', '1000.00');
    cy.get('.money.minus').should('contain', '0.00');
  });

  it('adds an expense transaction and updates totals', () => {
    cy.get('#description').type('Groceries');
    cy.get('#transactionamount').type('-50');
    cy.contains('button', 'Add Transaction').click();

    cy.get('.list li').should('have.length', 1);
    cy.get('.list li').first().should('contain', 'Groceries').and('contain', '-$50');
    cy.get('#balance').should('contain', '$-50.00');
    cy.get('.money.plus').should('contain', '0.00');
    cy.get('.money.minus').should('contain', '50.00');
  });

  it('deletes a transaction from history', () => {
    cy.get('#description').type('Coffee');
    cy.get('#transactionamount').type('-5');
    cy.contains('button', 'Add Transaction').click();

    cy.get('.list li').should('have.length', 1);
    cy.get('.list li .delete-btn').click();
    cy.get('.list li').should('have.length', 0);
    cy.get('#balance').should('contain', '$0.00');
  });

  it('requires description and amount before submit', () => {
    cy.get('#description').clear();
    cy.get('#transactionamount').clear();
    cy.contains('button', 'Add Transaction').click();

    cy.get('.list li').should('have.length', 0);
    cy.get('#balance').should('contain', '$0.00');
  });
});
