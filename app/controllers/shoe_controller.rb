class ShoeController < ApplicationController
  def index
  end

  def show
    gon.deck = Deck.new(params[:id])
  end
end
