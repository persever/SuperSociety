class SessionsController < ApplicationController
  def new
    current_user ? (redirect_to root_url) : @user = User.new
  end

  def create
    @user = User.find_by_credentials(session_params[:username],
                                     session_params[:password])
    if @user
      sign_in(@user)
    else
      @user = User.new(session_params)
      flash.now[:errors] = ["Invalid login."]
      render :new
    end
  end

  def destroy
    sign_out
  end

  private

    def session_params
      params.require(:session).permit(:username, :password)
    end
end
