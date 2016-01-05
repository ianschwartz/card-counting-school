var vm = new Vue ({
  el: '#app',
  data: {
    deck: gon.deck,
    cards: gon.deck.cards,
    hand: [],
    count: 0
  },

  methods: {
    hitMe: function() {
      if (this.cards.length <= 10) {
        alert('No more cards!');
      } else {
        var card = this.cards[0];
        this.hand.push(card);
        this.cards.shift();
        this.count += card.value;
      }
    }
  }
});