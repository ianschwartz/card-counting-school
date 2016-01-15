class Challenge < ActiveRecord::Base

  def deck
    @deck = Deck.new(decks)
  end

  def cards
    deck.cards
  end
end
