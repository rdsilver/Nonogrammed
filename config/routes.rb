Nonogrammed::Application.routes.draw do
  get "dashboard/show"

  resources :grids


  resources :puzzles do
    member do
      post :check_solution
    end
  end

  resources :users

  root :to => 'dashboard#show'  
end
