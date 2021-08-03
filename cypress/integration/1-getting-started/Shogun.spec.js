/// <reference types="cypress" />

describe('Shogun of Edo app', () => {
  beforeEach(() => {
  })

  it("", () => {

  })

  it("5 player, both yield, only replaces one", () => {

  })

  it("5 player game, player goes into tokyo bay when tokyo occupied and tries to yield immediately, fails", () => {

  })

  it("tests 5th player eliminate, yield tokyo bay disappears", () => {

  })

  it("player gains 1 point when go into Tokyo on yield", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#yieldTokyo").click()
    cy.contains("Player 2Score: 1Health: 10Energy: 0")
  })

  it("player dies in tokyo and killer takes over", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.get("#doneYielding").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.contains("Tokyo: 3")
  })

  it("normal enter tokyo earn 1 point", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.contains("Player 2Score: 1Health: 10Energy: 0")
  })

  it("test normal yield", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#yieldTokyo").click()
    cy.contains("Tokyo: 4")
  })

  it("tests try buy before yield fails", () => {
    cy.visit('localhost:3000/shoguntest1')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click().then(
        () => {
          expect(stub.getCall(0)).to.be.calledWith('Deal with yield before buying.')
      }
      )
  })


  it("tests normal buying card", () => {
    cy.visit('localhost:3000/shoguntestbuy')
    cy.get("#spoof6Energy").click()
    cy.get("#buy0").click()
    cy.contains('Player 1Score: 3Health: 10Energy: 1')
  })

  it("tests can't afford card", () => {
    cy.visit('localhost:3000/shoguntestbuy')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.get("#buy0").click().then(
      () => {
        expect(stub.getCall(0)).to.be.calledWith('Not enough money to buy.')
      }
    )
    cy.contains('Player 1Score: 0Health: 10Energy: 0')
  })

  it("tests win with points card buy", () => {

  })

  it("tests tries to buy empty card", () => {
    cy.visit('localhost:3000/shoguntestbuy')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoof6Energy").click()
    cy.get("#buy0").click()
    cy.get("#buy2").click().then(
      () => {
        expect(stub.getCall(0)).to.be.calledWith("Cannot buy card 3 because it doesn't exist.")
      }
    )

  })

  it("test basic heal", () => {
    cy.visit('localhost:3000/shoguntest2')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofHeart").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 2Score: 0Health: 10Energy: 0")
  })

  it("test no heal tokyo", () => {
    cy.visit('localhost:3000/shoguntest2')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneYielding").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofHeart").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 3Health: 9Energy: 0")
  })

  it("test win by elimination", () => {
    cy.visit('localhost:3000/shoguntest1')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click().then(
      () => {
        expect(stub.getCall(0)).to.be.calledWith('Player 3 wins!')
      }
    )

  })

  it("test win with tokyo points", () => {
    cy.visit('localhost:3000/shoguntest1')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click().then(
      () => {
        expect(stub.getCall(0)).to.be.calledWith('Player 2 wins!')
      }
    )
  })

  it('test roll saving', () => {
    cy.visit('localhost:3000/shoguntest2')
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

  it('test roll decrement and reset', () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.contains("Remaining Rolls: 3")
    cy.get("#roll").click()
    cy.contains("Remaining Rolls: 2")
    cy.get("#roll").click()
    cy.contains("Remaining Rolls: 1")
    cy.get("#roll").click()
    cy.contains("Remaining Rolls: 0")
    cy.get("#roll").click()
    cy.contains("Remaining Rolls: 0")
    cy.get("#resolveRoll").click()
    cy.get("#doneBuying").click()
    cy.contains("Remaining Rolls: 3")
  })

  it('test win with rolls', () => {
    cy.visit('localhost:3000/shoguntest1')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()      
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click().then(
      () => {
        expect(stub.getCall(0)).to.be.calledWith('Player 1 wins!')
      }
    )
  })


})
