class WelcomeController < ApplicationController

  def ring
    render :partial => "ring"
  end

  def index
  end

  def show
    @mood = params[:mood]
    render :show
  end

end
