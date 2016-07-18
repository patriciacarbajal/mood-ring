require 'rails_helper'

feature 'select song' do 
  scenario 'When I visit the homepage' do 
  	visit root_path

  	expect(page).to have_content('mood ring')
  end

  scenario 'Checking the css of the buttons' do 
  	visit root_path

  	expect(page).to have_css('.happy')
  end
  
  scenario 'getting to search for a song path' do 
  	visit root_path

  	find('#enterSong').click
  	expect(page).to have_content('Choose a song to add')
  end
  
  scenario 'searching a song' do 
  	visit root_path

  	find('#enterSong').click
  	find('#titleSearch').set('campanella')
  	expect(page).to_not have_content("song title")
  end

  scenario 'exiting search is possible' do 
  	visit root_path

  	find('#enterSong').click 
  	find('#close').click
  	expect(page).to_not have_content('song title')
  end

  scenario 'clicking back button after searching but before adding' do 
  	visit root_path

  	find('#enterSong').click
  	find('#titleSearch').set('it ends tonight')
  	find('#going-back').click
  	expect(page).to_not have_content('it ends tonight')
  end
end