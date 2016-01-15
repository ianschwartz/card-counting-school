class ChallengesController < ApplicationController
  def index
  end

  def show
    gon.cards = Challenge.find(params[:id]).cards
  end
end
