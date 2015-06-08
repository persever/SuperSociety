class SessionsController < ApplicationController
  def destroy
    sign_out
  end
end
