Rails.application.routes.draw do
  root 'homepage#index'
  post 'predict' => 'predictions#create'
end
