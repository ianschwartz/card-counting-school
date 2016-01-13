Vue.component('is-card', {
  props: ['card'],
  template: '#card-template'
});

var vm = new Vue ({
  el: '#app',
  data: {
    deck: gon.deck,
    cards: gon.deck.cards,
    hands: {
      player: [],
      dealer: []
    },
    count: 0,
    myTurn: true,
    message: 'Your Turn'
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
    decksRemaining: function() {
      var total = (this.cards.length / 52);
      var rounded = total.toFixed(1);
      return rounded;
    },
    activePlayer: function() {
      var text = 'hands.player';
      return text;
    }
  },

  methods: {
    hitMe: function(hand) {
      if (this.cards.length <= 10) {
        alert('No more cards!');
      } else {
      var card = this.nextCard;
      this.count += card.value;        
      hand.push(card);
      this.cards.shift();
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
      this.newGame;
    },
    newGame: function() {
      this.myTurn = true;
      this.hands.player = [];
      this.hands.dealer = [];
      this.message = 'Your turn again!';
      this.newDeal();
    },
    newDeal: function() {
      this.hitMe(this.hands.player);
      this.hitMe(this.hands.dealer);
      this.hitMe(this.hands.player); 
      this.hitMe(this.hands.dealer);
    }
  }
});

window.onload = vm.newDeal();