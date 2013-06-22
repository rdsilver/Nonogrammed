Nonogrammed::Application.routes.draw do
  get "dashboard/show"

  resources :grids


  resources :puzzles


  resources :users

  root :to => 'dashboard#show'  
end
