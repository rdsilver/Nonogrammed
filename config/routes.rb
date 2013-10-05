Nonogrammed::Application.routes.draw do
  get "dashboard/show"

  resources :grids


  resources :puzzles do
    member do
      post :check_solution
      post :give_hint
      post :get_stats
    end
  end

  resources :users

  resources :dashboard do
  	member do
  	 post :show
  	end
  end

  root :to => 'dashboard#show'  
end
