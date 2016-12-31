module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :temp_user_id

    def connect
      self.temp_user_id = set_temp_user_id
    end

    protected

    def set_temp_user_id
      if user_id = cookies.signed[:temp_user_id]
        return user_id
      else
        fail 'user does not have id?'
      end
    end
  end
end
