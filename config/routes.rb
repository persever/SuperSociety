Rails.application.routes.draw do
  root to: 'static_pages#index'

  resource :session, only: [:new, :create, :destroy], path: "welcome"
  resources :users, only: [:new, :create], path: "join-us"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index]
    resources :groups
    resources :subscriptions, only: [:create, :destroy]
    resources :events
    resources :attendings, only: [:create, :destroy]
  end
end
