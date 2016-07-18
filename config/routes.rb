Rails.application.routes.draw do

  root 'welcome#index'
  get 'welcome/ring' => "welcome#ring"

  get 'welcome/show' => 'welcome#show'

  get '/songs/create' => 'songs#create'

  post '/songs/create' => 'songs#create'

  get '/songs/index' => 'songs#index'

end

