class UsersController < ApplicationController
  def new
    redirect_to root_url if current_user
    @user = User.new
    guest_users = [
      User.find_by({ username: "Tony Stark"}),
      User.find_by({ username: "Bruce Wayne"}),
      User.find_by({ username: "Thor"}),
      User.find_by({ username: "Steve Rogers"})
    ]
    User.guest_user = guest_users.sample
  end

  def create
    if params[:submission] == "Sign Up"
      @user = User.new(user_params)
      @user.photo_url = "https://res.cloudinary.com/dgzqgdlmj/image/upload/v1434497946/avatar_pcwjvc.jpg"
      if @user.save
        sign_in(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    elsif params[:submission] == "Log In"
      @user = User.find_by_credentials(user_params)
      if @user
        sign_in(@user)
      else
        @user = User.new(user_params)
        flash.now[:errors] = ["Invalid login"]
        render :new
      end
    elsif params[:submission] == "Guest Pass"
      sign_in(User.guest_user)
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :photo_url)
    end
end
