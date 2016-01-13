Vue.component('is-card', {
  props: ['card'],
  template: '#card-template'
});

var vm = new Vue ({
  el: '#app',
  data: {
    deck: gon.deck,
    cards: gon.deck.cards,
    hand: [],
    count: 0
  },

  computed: {
    trueCount: function(){
      var total = this.count / this.decksRemaining;
      var rounded = total.toFixed(2);
      return rounded;
    },
    decksRemaining: function() {
      var total = (this.cards.length / 52);
      var rounded = total.toFixed(1);
      return rounded;
    }
  },

  methods: {
    hitMe: function() {
      if (this.cards.length <= 10) {
        alert('No more cards!');
      } else {
        var card = this.cards[0];
        this.hand.unshift(card);
        this.cards.shift();
        this.count += card.value;
      }
    }
  }
});
