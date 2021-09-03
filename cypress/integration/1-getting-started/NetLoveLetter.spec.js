/// <reference types="cypress" />

describe('Network Love Letter tests', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

  it("ai test, check keep higher card when last turn", () => {

  })

  it("ai test, check keep high card if last turn", () => {
    
  })

//   it("check AI doesn't voluntarily play princess", () => {
//     cy.visit('localhost:3000/netloveletter')
//     cy.get("#resetTests").click()
//     cy.wait(2000)
//     cy.get("#playAiTurn").click()
//     cy.get('#hand1').find('img').should('have.attr', 'alt', 'princess')
//   })

  it('test game run with a few hand clicks (for default gameId 1)', () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.get('#drawCard').click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("2")
    cy.get("#playerAreaButton").click()
    cy.wait(200)
    cy.get('#drawCard').click()
    cy.get("#playerArea").clear().type("3")
    cy.get("#playerAreaButton").click()
    cy.wait(200)
    cy.get('[type="radio"]').check('1')
    cy.get("#hand3").click()
  })

//   it('check countess forced play AI turn, prince', () => {
//   })

  // it('check countess forced play AI turn, king', () => {
  //   cy.visit('localhost:3000/loveletteraitest3')
  //   cy.get("#playAiTurn").click()
  //   cy.contains("Show All").click()
  //   cy.contains("priest")
  //   cy.contains("king")
  //   cy.contains("king")
  //   cy.contains("baron")
  //   cy.contains("princess")
  // })

})
