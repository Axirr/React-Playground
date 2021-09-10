/// <reference types="cypress" />

describe('Network Shogun of Edo app', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

  it("normal yield edo", () => {

  })

  it("normal do not yield edo", () => {

  })


  it("5 player, both yield, only replaces one", () => {

  })

  it("5 player game, player goes into edo bay when edo occupied and tries to yield immediately, fails", () => {

  })

  it("tests 5th player eliminate, yield edo bay disappears", () => {

  })

  it("damage muliple players, with an elimination in the middle (e.g. fire blast or high altitude bombing)", () => {

  })

  it("tests win with points card buy", () => {

  })

  it("test herbivore", () => {

  })

  it("test heal", () => {

  })

  it("test giant brain", () => {

  })

  it("test fire blast", () => {

  })

  it("check killed by jets don't win", () => {

  })

  it("check elimination with addhealth goes negative", () => {

  })

  it("rooting for underdog", () => {

  })

  it("all players eliminated, who wins?", () => {

  })

  it("high altitude bomb with eliminations, including last player in game", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(500)
    cy.get("#gameArea").clear().type("8")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#healthInput").clear().type("2")
    cy.get("#maxHealthButton").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy2").click()
    cy.wait(300)
  })

  it("normal gas refinery", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(500)
    cy.get("#gameArea").clear().type("8")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy1").click()
    cy.wait(300)
    cy.contains("Player 1Score: 2Health: 10Energy: 0")
    cy.contains("Player 2Score: 0Health: 7Energy: 0")
    cy.contains("Player 3Score: 0Health: 7Energy: 0")
    cy.contains("Player 4Score: 0Health: 7Energy: 0")
  })

  it("normal high altitude bomb", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(500)
    cy.get("#gameArea").clear().type("8")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy2").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 7Energy: 2")
    cy.contains("Player 2Score: 0Health: 7Energy: 0")
    cy.contains("Player 3Score: 0Health: 7Energy: 0")
    cy.contains("Player 4Score: 0Health: 7Energy: 0")
  })

  it("test regeneration", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(500)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy1").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.get("#advancePlayerNumber").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofHeart").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 0Health: 6Energy: 2")
  })

  it("test omnivore combo score", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.contains("Player 1Score: 2Health: 10Energy: 2")
  })

  it("nova breath test", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(1000)
    cy.get("#gameArea").clear().type("2")
    cy.get("#gameAreaButton").click()
    cy.wait(1000)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy1").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.contains("Player 1Score: 1Health: 10Energy: 5")
    cy.contains("Player 2Score: 0Health: 9Energy: 0")
    cy.contains("Player 3Score: 0Health: 9Energy: 0")
    cy.contains("Player 4Score: 0Health: 9Energy: 0")
  })

  it("attempt clear buy without enough money fail", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#clearBuy").click().then(
    // cy.get("#doneBuying").click().then(
        () => {
          expect(stub.getCall(1)).to.be.calledWith('Not enough money to clear.')
      }
      )
  })

  it("normal clear buy", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#clearBuy").click()
    cy.contains("Apartment Building")
    cy.contains("Commuter Train")
    cy.contains("Corner Store")
  })

  it("test keep card, alien metabolism", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy2").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 10Energy: 1")
  })


  it("test keep card, acid attack", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy1").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.get("#advancePlayerNumber").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.contains("Player 2Score: 1Health: 8Energy: 0")
  })

  it("test keep card, friend of children", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 10Energy: 10")
  })

  it('test win with rolls', () => {
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#gameArea").clear().type("3")
    cy.get("#gameAreaButton").click()
    cy.wait(500)
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()      
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.contains("Player 1 wins!")
  })

  it("player gains 1 point when go into Edo on yield", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#setEdo").click()
    cy.get("#yieldEdo").click()
    cy.wait(300)
    cy.contains("Player 2Score: 1Health: 10Energy: 0")
  })

  it("test win with edo points", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.contains("Player 2 wins!")
  })

  it("test win by elimination", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(500)
    cy.contains("Player 3 wins!")
  })

  it("player dies in edo and killer takes over", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(300)
    cy.get("#playerArea").clear().type("1")
    cy.get("#playerAreaButton").click()
    cy.wait(300)
    cy.get("#doneYielding").click()
    cy.wait(300)
    cy.get("#playerArea").clear().type("2")
    cy.get("#playerAreaButton").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Claw").click()
    cy.wait(300)
    cy.contains("EdoPlayer 3")
  })


  it("normal enter edo earn 1 point", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.contains("Player 2Score: 1Health: 10Energy: 0")
  })

  it("test normal yield", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#setEdo").click()
    cy.get("#yieldEdo").click()
    cy.wait(300)
    cy.contains("EdoPlayer 4")
  })

  it("tests normal buying card", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("4")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy2").click()
    cy.wait(300)
    cy.contains('Player 1Score: 1Health: 10Energy: 3')
  })

  it("tests can't afford card", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("4")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#buy0").click().then(
      () => {
        expect(stub.getCall(1)).to.be.calledWith('Not enough money to buy.')
      }
    )
    cy.contains('Player 1Score: 0Health: 10Energy: 0')
  })

  it("tests tries to buy empty card", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("4")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.get("#buy2").click().then(
      () => {
        expect(stub.getCall(1)).to.be.calledWith("Cannot buy card 3 because it doesn't exist.")
      }
    )

  })

  it("test basic heal", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("5")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofHeart").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Player 2Score: 0Health: 10Energy: 0")
  })

  it("test no heal edo", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("5")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneYielding").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofHeart").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Player 1Score: 3Health: 9Energy: 0")
  })

  it('test roll saving', () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("5")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#roll").click()
    cy.wait(300)
    cy.get("#dice0").should('have.class', 'btn-warning').click()
    cy.wait(300)
    cy.get("#dice0").should('have.class', 'btn-secondary')
    cy.wait(300)
    cy.get("#dice0").then(($btn) => {
      const txt1 = $btn.text()
      cy.get("#roll").click()
      cy.get("#dice0").then(($newBtn) => {
        const txt2 = $newBtn.text()
        expect(txt1).is.equal(txt2)
      })
    })
  })

  it('test roll decrement and reset', () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("5")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 3")
    cy.get("#roll").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 2")
    cy.get("#roll").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 1")
    cy.get("#roll").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 0")
    cy.get("#roll").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 0")
    cy.wait(300)
    cy.get("#resolveRoll").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Remaining Rolls: 3")
  })

  it("test evacuation orders, some points below 5", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("6")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 3Health: 10Energy: 0")
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.contains("Player 2Score: 3Health: 10Energy: 0")
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Player 3Score: 0Health: 10Energy: 0")
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof3Points3Energy").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.contains("Player 1Score: 1Health: 10Energy: 0")
    cy.contains("Player 2Score: 0Health: 10Energy: 0")
    cy.contains("Player 3Score: 0Health: 10Energy: 0")
    cy.contains("Player 4Score: 3Health: 10Energy: 2")
  })

  it("even bigger, initial 2 and heal above 10", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("7")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy2").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 12Energy: 2")
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofHeart").click()
    cy.wait(300)
    cy.contains("Player 1Score: 1Health: 11Energy: 2")
  })


  it("energy hoarder card test", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("7")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy1").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 10Energy: 3")
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.contains("Player 1Score: 0Health: 10Energy: 10")
  })

  it("complete destruction test", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("7")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    cy.get("#spoof6Energy").click()
    cy.wait(300)
    cy.get("#buy0").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofNone").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofCompleteDestruction").click()
    cy.contains("Player 1 earns 9 points for COMPLETE DESTRUCTION!")
  })




  it("tests try buy before yield fails", () => {
    cy.visit('localhost:3000/netshogun')
    cy.get("#gameArea").clear().type("7")
    cy.get("#gameAreaButton").click()
    cy.wait(300)
    cy.get("#resetTests").click()
    cy.wait(300)
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click()
    cy.wait(300)
    cy.get("#advancePlayerNumber").click()
    cy.get("#spoofClaw").click()
    cy.wait(300)
    cy.get("#doneBuying").click().then(
        () => {
          expect(stub.getCall(1)).to.be.calledWith('Not buy phase.')
      }
      )
  })
})