/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/shoguntest')
  })

  it('test roll saving', () => {
    cy.get("#roll").click()
    cy.get("#dice0").should('have.class', 'btn-danger').click()
    cy.get("#dice0").should('have.class', 'btn-success')
    cy.get("#dice0").then(($btn) => {
      const txt1 = $btn.text()
      cy.get("#roll").click()
      cy.get("#dice0").then(($newBtn) => {
        const txt2 = $newBtn.text()
        expect(txt1).is.equal(txt2)
      })
    })
  })
})
