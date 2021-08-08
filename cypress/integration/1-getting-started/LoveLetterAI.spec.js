/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

  it("check keep higher card when last turn", () => {

  })

  it("check keep high card if last turn", () => {
    
  })

  it("check AI don't voluntarily play princess", () => {
    cy.visit('localhost:3000/loveletteraitest4')
    cy.get("#playAiTurn").click()
    cy.contains("Show All").click()
    cy.contains("priest")
    cy.contains("king")
    cy.contains("king")
    cy.contains("baron")
    cy.contains("princess")
  })

  it('check countess forced play AI turn, prince', () => {
    cy.visit('localhost:3000/loveletteraitest2')
    cy.get("#playAiTurn").click()
    cy.contains("Show All").click()
    cy.contains("princess")
  })

  it('check countess forced play AI turn, king', () => {
    cy.visit('localhost:3000/loveletteraitest3')
    cy.get("#playAiTurn").click()
    cy.contains("Show All").click()
    cy.contains("priest")
    cy.contains("king")
    cy.contains("king")
    cy.contains("baron")
    cy.contains("princess")
  })

  it('test game run with handmaiden, guard, king, baron, princess use', () => {
    cy.visit('localhost:3000/loveletteraitest')
    cy.contains("Show All").click()
    cy.contains("handmaiden")
    cy.contains("guard")
    cy.contains("king")
    cy.contains("baron")
    cy.contains("princess")
    cy.contains("handmaiden").click()
    cy.contains("[true,false,false,false]")
    cy.contains("Show Current").click()
    cy.contains("priest")
    cy.contains("king")
    cy.contains("baron").should('not.exist')
    cy.get('[type="radio"]').check('3')
    cy.contains("king").click()
    cy.contains("Show Current").click()
    cy.contains("priest")
    cy.get('[type="radio"]').check('2')
    cy.get('[type="radio"]').check('baron')
    cy.contains("guard").click()
    cy.contains("[1,3,4]")
    cy.contains("Show Current").click()
    cy.contains("princess").click()
    cy.contains("[1,3]")
    cy.contains("Show Current").click()
    cy.get('[type="radio"]').check('3')
    cy.get('[type="radio"]').check('priest')
    cy.contains("guard").click()
  })
})
