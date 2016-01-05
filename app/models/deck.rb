class Deck
  def initialize(number)
    @cards = []
    number.to_i.times do 
      Card.all.each do |c|
        @cards << c
      end
    end
    @cards.shuffle!
  end

  def cards
    @cards
  end


end