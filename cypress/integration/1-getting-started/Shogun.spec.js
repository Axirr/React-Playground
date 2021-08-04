/// <reference types="cypress" />

describe('Shogun of Edo app', () => {
  beforeEach(() => {
  })

  it("", () => {

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

  it("test regneration", () => {
    cy.visit('localhost:3000/shoguntestbuy8')
    cy.get("#spoof6Energy").click()
    cy.get("#buy1").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
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
    cy.get("#spoofHeart").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 0Health: 6Energy: 2")
  })

  it("test omnivore combo score", () => {
    cy.visit('localhost:3000/shoguntestbuy8')
    cy.get("#spoof6Energy").click()
    cy.get("#buy0").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.contains("Player 1Score: 2Health: 10Energy: 2")
  })

  it("nova breath test", () => {
    cy.visit('localhost:3000/shoguntestbuy7')
    cy.get("#spoof6Energy").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Energy").click()
    cy.get("#buy1").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
      cy.contains("Player 1Score: 1Health: 10Energy: 5")
      cy.contains("Player 2Score: 0Health: 9Energy: 0")
      cy.contains("Player 3Score: 0Health: 9Energy: 0")
      cy.contains("Player 4Score: 0Health: 9Energy: 0")
  })

  it("test evacuation orders, some points below 5", () => {
    cy.visit('localhost:3000/shoguntestbuy4')
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 3Health: 10Energy: 0")
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 2Score: 3Health: 10Energy: 0")
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 3Score: 0Health: 10Energy: 0")
    cy.get("#spoof6Energy").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof3Points3Energy").click()
    cy.get("#buy0").click()
    cy.contains("Player 1Score: 1Health: 10Energy: 0")
    cy.contains("Player 2Score: 0Health: 10Energy: 0")
    cy.contains("Player 3Score: 0Health: 10Energy: 0")
    cy.contains("Player 4Score: 3Health: 10Energy: 2")
  })

  it("even bigger, initial 2 and heal above 10", () => {
    cy.visit('localhost:3000/shoguntestbuy3')
    cy.get("#spoof6Energy").click()
    cy.get("#buy2").click()
    cy.contains("Player 1Score: 0Health: 12Energy: 2")
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofHeart").click()
    cy.contains("Player 1Score: 1Health: 11Energy: 2")
  })

  it("attempt clear buy without enough money fail", () => {
    cy.visit('localhost:3000/shoguntestbuy2')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get("#spoofNone").click()
    cy.get("#clearBuy").click()
    cy.get("#doneBuying").click().then(
        () => {
          expect(stub.getCall(0)).to.be.calledWith('Not enough money to clear.')
      }
      )
  })

  it("normal clear buy", () => {
    cy.visit('localhost:3000/shoguntestbuy2')
    cy.get("#spoof6Energy").click()
    cy.get("#clearBuy").click()
    cy.contains("Apartment Building")
    cy.contains("Commuter Train")
    cy.contains("Corner Store")
  })

  it("5 player, both yield, only replaces one", () => {

  })

  it("5 player game, player goes into edo bay when edo occupied and tries to yield immediately, fails", () => {

  })

  it("tests 5th player eliminate, yield edo bay disappears", () => {

  })

  it("energy hoarder card test", () => {
    cy.visit('localhost:3000/shoguntestbuy3')
    cy.get("#spoof6Energy").click()
    cy.get("#buy1").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 0Health: 10Energy: 3")
    cy.get("#spoof6Energy").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.contains("Player 1Score: 0Health: 10Energy: 10")
  })

  it("complete destruction test", () => {
    cy.visit('localhost:3000/shoguntestbuy3')
    cy.get("#spoof6Energy").click()
    cy.get("#buy0").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofCompleteDestruction").click()
    cy.contains("Player 1 earns 9 points for COMPLETE DESTRUCTION!")
  })

  it("test keep card, alien metabolism", () => {
    cy.visit('localhost:3000/shoguntestbuy2')
    cy.get("#spoof6Energy").click()
    cy.get("#buy2").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#buy0").click()
    cy.contains("Player 1Score: 0Health: 10Energy: 1")
  })

  it("test keep card, acid attack", () => {
    cy.visit('localhost:3000/shoguntestbuy2')
    cy.get("#spoof6Energy").click()
    cy.get("#buy1").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.contains("Player 2Score: 1Health: 8Energy: 0")
  })

  it("test keep card, friend of children", () => {
    cy.visit('localhost:3000/shoguntestbuy2')
    cy.get("#spoof6Energy").click()
    cy.get("#buy0").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofNone").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Energy").click()
    cy.contains("Player 1Score: 0Health: 10Energy: 10")
  })

  it("player gains 1 point when go into Edo on yield", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoofClaw").click()
    cy.get("#yieldEdo").click()
    cy.contains("Player 2Score: 1Health: 10Energy: 0")
  })

  it("player dies in edo and killer takes over", () => {
    cy.visit('localhost:3000/shoguntest1')
    cy.get("#spoofClaw").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.get("#doneYielding").click()
    cy.get("#doneBuying").click()
    cy.get("#spoof6Claw").click()
    cy.contains("Edo: 3")
  })

  it("normal enter edo earn 1 point", () => {
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
    cy.get("#yieldEdo").click()
    cy.contains("Edo: 4")
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

  it("test no heal edo", () => {
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

  it("test win with edo points", () => {
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
    cy.get("#dice0").should('have.class', 'btn-warning').click()
    cy.get("#dice0").should('have.class', 'btn-secondary')
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
