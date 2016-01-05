class ShoeController < ApplicationController
  def index
    gon.deck = Deck.new.cards
  end
end
