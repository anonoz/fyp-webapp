Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  root 'homepage#index'
  get  'predictions' => 'predictions#index'
  post 'predict' => 'predictions#create'
  get  'corrections' => 'corrections#index'
  post 'corrections' => 'corrections#create'
end
