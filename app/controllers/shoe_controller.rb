class ShoeController < ApplicationController
  def index
    gon.deck = Deck.new(1)
  end
end
