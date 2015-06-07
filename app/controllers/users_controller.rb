class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      p "SAVED #{@user.username}"
      sign_in(@user)
    else
      p "ERRORSSSSSSSSSSS"
      p @user.errors.full_messages
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end
end
