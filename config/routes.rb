Rails.application.routes.draw do
  root to: 'static_pages#index'

  resource :session, only: [:destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :groups
    resources :events
  end
end
