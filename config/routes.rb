Rails.application.routes.draw do
  root to: 'static_pages#index'

  resource :session, only: [:new, :create, :destroy]
  resources :users

  # namespace :api, defaults: { format: :json } do
    resources :groups do
      resources :events
    end
  # end
end
