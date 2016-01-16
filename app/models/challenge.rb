class Challenge < ActiveRecord::Base
  has_many :attempts
  has_many :users, :through => :attempts

  def deck
    @deck = Deck.new(decks)
  end

  def cards
    deck.cards
  end
end
