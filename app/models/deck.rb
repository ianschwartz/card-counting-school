class Deck
  def initialize
    @cards = Card.all.shuffle
  end

  def cards
    @cards
  end
end