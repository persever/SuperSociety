class UsersController < ApplicationController
  def new
    redirect_to root_url if current_user
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :photo_url)
    end
end
