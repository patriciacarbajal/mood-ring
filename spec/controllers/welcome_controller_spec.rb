require 'rails_helper'

describe WelcomeController, :type => :controller do
  context "when you go to the homepage" do
    it "should render the homepage" do
      get :homepage
      expect(response).to be_success
    end
  end
end

