Nonogrammed::Application.routes.draw do
  resources :grids


  resources :puzzles


  resources :users

  root :to => 'welcome#index'  
end
