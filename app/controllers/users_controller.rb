class UsersController < ApplicationController
  def new
    redirect_to root_url if current_user
    @user = User.new
  end

  def create

    # @user = User.new(user_params)
    # if @user.save
    #   sign_in(@user)
    # else
    #   flash.now[:errors] = @user.errors.full_messages
    #   render :new
    # end

    if params[:submission] == "Sign Up"
      @user = User.new(user_params)
      @user.photo_url = "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434497946/avatar_pcwjvc.jpg"
      if @user.save
        sign_in(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    elsif params[:submission] == "Log In"
      @user = User.find_by_credentials(user_params[:username],
                                       user_params[:password])
      if @user
        sign_in(@user)
      else
        @user = User.new(user_params)
        flash.now[:errors] = ["Invalid login."]
        render :new
      end
    elsif params[:submission] == "Guest Pass"
      @user = User.find_by({ username: "Iron Man"})
      sign_in(@user)
    end

  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :photo_url)
    end
end