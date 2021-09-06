/// <reference types="cypress" />

describe('Network Love Letter tests', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

  it("prince, target self", () => {

  })

  it("guard guess, elimination", () => {

  })

  it("countess force play with prince", () => {

  })

  it("basic win, showdown", () => {

  })

  it("basic win by eliminations", () => {

  })
  
  it("play princess, eliminated", () => {

  })

  it("prince targets not self, not princess, last card in deck", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("6")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('2')
    cy.get("#drawCard").click()
    cy.wait(100)
    cy.contains("Player 2 hand card was a guard.")
    cy.contains("Player 2 wins!")
  })

  it("prince targets self, not princess, last card in deck, gets princess set aside card, wins", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("6")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('1')
    cy.get("#drawCard").click()
    cy.wait(100)
    cy.contains("Player 1 hand card was a handmaiden.")
    cy.contains("Player 1 wins!")
  })

  it("prince draw card target self, discard not princess", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("5")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('1')
    cy.get("#drawCard").click()
    cy.wait(100)
    cy.contains("Player 1 hand card was a handmaiden.")
  })

  it("prince hand target self, discard not princess", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('1')
    cy.get("#hand1").click()
    cy.wait(100)
    cy.contains("Player 1 hand card was a baron.")
  })

  it("prince target self, discards princess", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("4")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('1')
    cy.get("#hand1").click()
    cy.wait(100)
  })

  it("prince, non-self target, discard non-princess", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('3')
    cy.get("#hand1").click()
    cy.wait(100)
    cy.contains('Player 3 discards their hand.')
    cy.contains('Message -5: Player 3 hand card was a baron.')
  })

  it("prince, non-self target, discard princess, eliminated", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('2')
    cy.get("#hand1").click()
    cy.wait(100)
    cy.contains("Player 2 was eliminated.")
    cy.contains('Player 2 discarded a princess.')
  })

  it("baron comparison win, eliminated", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('2')
    cy.get("#hand1").click()
    cy.wait(100)
    cy.contains("Player 2 was eliminated.")
  })

  it("baron comparison tie, no elimination", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("7")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('3')
    cy.get("#hand1").click()
    cy.wait(100)
    cy.contains("Player 3 and Player 1 tie in baron comparison.")
  })

  it("can't target handmaiden", () => {
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("2")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get("#hand1").click()
    cy.wait(100)
    cy.get("#advancePlayerNumber").click()
    cy.get('[type="radio"]').check('1')
    cy.get("#hand2").click().then(
        () => {
          expect(stub.getCall(1)).to.be.calledWith('Not a valid move')
      })
  })

  it("can't target self", () => {
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("2")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get("#hand1").click()
    cy.wait(100)
    cy.get("#advancePlayerNumber").click()
    cy.get('[type="radio"]').check('2')
    cy.get("#hand2").click().then(
        () => {
          expect(stub.getCall(1)).to.be.calledWith('Not a valid move')
      })
  })


  it("basic priest, check alert window provided", () => {
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#gameArea").clear().type("2")
    cy.get("#gameAreaButton").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get("#hand1").click()
    cy.wait(100)
    cy.get("#advancePlayerNumber").click()
    cy.get('[type="radio"]').check('3')
    cy.get("#hand2").click().then(
        () => {
          expect(stub.getCall(1)).to.be.calledWith('Player 3 has a baron')
      }
      )
  })

  it("basic guard guess", () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(100)
    cy.get('[type="radio"]').check('2')
    cy.get('[type="radio"]').check('king')
    cy.get('#drawCard').click()
    cy.wait(200)
    cy.contains('Player 2 was eliminated.')
  })

  it("no valid targets except handmaidens, allowed to play target card", () => {

  })

  it("ai test, check keep higher card when last turn", () => {

  })

  it("ai test, check keep high card if last turn", () => {
    
  })


  it('test game run with a few hand clicks (for default gameId 1)', () => {
    cy.visit('localhost:3000/netloveletter')
    cy.get("#resetTests").click()
    cy.wait(200)
    cy.get('#drawCard').click()
    cy.wait(200)
    cy.get("#advancePlayerNumber").click()
    cy.wait(200)
    cy.get('#drawCard').click()
    cy.get("#advancePlayerNumber").click()
    cy.wait(200)
    cy.get('[type="radio"]').check('1')
    cy.get("#hand3").click()
  })

  // it("check AI doesn't voluntarily play princess", () => {
  //   cy.visit('localhost:3000/netloveletter')
  //   cy.get("#resetTests").click()
  //   cy.wait(2000)
  //   cy.get("#playAiTurn").click()
  //   cy.get('#hand1').find('img').should('have.attr', 'alt', 'princess')
  // })
  it('check countess forced play AI turn, prince', () => {
  })

  it('check countess forced play AI turn, king', () => {
  })

})
