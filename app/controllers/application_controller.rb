class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    User.find_by(session_token: session[:token])
  end

  def require_signed_in
    redirect_to new_user_url unless current_user
  end

  def sign_in(user)
    user.reset_session_token!
    session[:token] = user.session_token
    redirect_to root_url
  end

  def sign_out
    current_user.reset_session_token! if current_user
    session[:token] = nil
    redirect_to new_user_url
  end

end
