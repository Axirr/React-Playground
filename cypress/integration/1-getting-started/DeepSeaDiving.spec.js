
/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

//   it("fall off board after reach end", () => {
//     cy.visit('localhost:3000/deepseadivingtest1')
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#turnAround").click()
//     cy.get("#spoof33").click()
//     cy.contains("00000023400000000000000000000000")
//   })

//   it("bounce off back", () => {
//     cy.visit('localhost:3000/deepseadivingtest1')
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.get("#spoof33").click()
//     cy.contains("00000000000000000000000000004312")
//   })

  it("check leap frog second player same as first", () => {
    cy.visit('localhost:3000/deepseadivingtest1')
    cy.get("#spoof33").click()
    cy.get("#spoof33").click()
    cy.contains("00000120000000000000000000000000")
  })
})
