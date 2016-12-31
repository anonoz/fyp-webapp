Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  root 'homepage#index'
  post 'predict' => 'predictions#create'
  post 'corrections' => 'corrections#create'
end
