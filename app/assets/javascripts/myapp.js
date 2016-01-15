Vue.component('is-card', {
  props: ['card'],
  template: '#card-template'
});

var vm = new Vue ({
  el: '#app',
  data: {
    cards: gon.cards,
    hands: {
      player: [],
      dealer: []
    },
    count: 0,
    cardsDealt: 0,
    myTurn: true,
    message: 'Your Turn',
    scores: {
      player: 0,
      dealer: 0
    },
    userCount: 0,
    attempts: 0,
    passed: false
  },

  computed: {
    nextCard: function() {
      return this.cards[0];
    },
    trueCount: function(){
      var total = this.count / this.decksRemaining;
      var rounded = total.toFixed(2);
      return rounded;
    },
    cardsRemaining: function() {
      return this.cards.length;
    },
    decksRemaining: function() {
      var rounded = (this.cardsRemaining / 52).toFixed(1);
      return rounded;
    },
    shoeEmpty: function() {
      if (this.cardsRemaining <= (this.cardsDealt / 6)) {
        return true;
      } else {
        return false;
      }
    }, 
    activePlayer: function() {
      var text = 'hands.player';
      return text;
    },
    playerBust: function() {
      var score = this.scores.player;
      if (score >= 22) {
        return true;
      } else {
        return false;
      }
    },
    dealerBust: function() {
      var score = this.scores.dealer;
      if (score >= 22) {
        return true;
      } else {
        return false;
      }
    },
    noMore: function() {
      if (this.playerBust || this.dealerBust) {
        return true;
      } else if (this.dealerStick && !this.myTurn) {
        return true;
      } else {
        return false;
      }
    },
    dealerStick: function() {
      if (this.scores.dealer >= 17) {
        return true;
      }
    },
    canGuess: function() {
      if (this.attempts < 1) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    points: function(arg) {
      var card = arg;
      if (card == 'A') {
        return 11;
      } else if ((card == 'J') || (card == 'Q') || (card == "K")) {
        return 10;
      } else {
        return parseInt(arg);
      }
    },
    hitMe: function(hand) {
      if (this.shoeEmpty) {
        this.gameOver('No more Cards!');
      } else {
        var card = this.nextCard;
        this.count += card.value;
        hand.push(card);
        this.cards.shift();
        this.addScore(card.rank);
        this.cardsDealt += 1;
      }
    },
    addScore: function(arg) {
      var arg = arg;
      if (this.myTurn) {
        this.scores.player += this.points(arg);
        if (this.playerBust) {
          this.gameOver('You busted!');
        }
      } else {
        this.scores.dealer += this.points(arg);
        if (this.dealerBust) {
          this.gameOver('Dealer busted!');
        } else if (this.dealerStick) {
          this.gameOver('Game over, dude!');
        }
      }
    },
    turnOver: function() {
      this.myTurn = false;
      this.dealerTurn();
    },
    dealerTurn: function() {
      this.message = "Dealer's Turn";
    },
    gameOver: function(message) {
      this.message = message;
      this.myTurn = false;
    },
    newGame: function() {
      this.myTurn = true;
      this.hands.player = [];
      this.hands.dealer = [];
      this.scores.player = 0;
      this.scores.dealer = 0;
      this.newDeal();
    },
    newDeal: function() {
      this.hitMe(this.hands.player);
      this.hitMe(this.hands.player); 
      this.myTurn = false;
      this.hitMe(this.hands.dealer);
      this.hitMe(this.hands.dealer);
      if (this.scores.dealer == 21) {
        this.gameOver('Dealer has Blackjack');
      } else if (this.scores.player == 21) {
        this.gameOver('Player has Blackjack');
      } else {
        this.message = 'Your turn again!';
        this.myTurn = true;
      }
    },
    upCount: function() {
      this.userCount += 1;
    },
    downCount: function() {
      this.userCount -= 1;
    },
    submitCount: function() {
      userCount = this.userCount;
      if (Math.round(userCount) == Math.round(this.trueCount)) {
        this.passed = true;
        alert('Yes!');
      } else {
        this.attempts += 1;
        alert('No!');
      }
    }
  }
});

window.onload = vm.newDeal();
