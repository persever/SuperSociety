Rails.application.routes.draw do
  root to: 'static_pages#index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update]
    resources :groups
    resources :subscriptions, only: [:create, :destroy] #:index
    resources :events
    resources :attendings, only: [:create, :destroy] #:index
  end

  resource :session, only: [:new, :create, :destroy], path: "welcome"
  resources :users, only: [:new, :create], path: "join-us"
end
