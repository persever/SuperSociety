Rails.application.routes.draw do
  root to: 'static_pages#index'

  resource :session, only: [:new, :create, :destroy], path: "welcome"
  resources :users, only: [:new, :create], path: "join-us"

  namespace :api, defaults: { format: :json } do
    resources :groups
    resources :events
  end
end
