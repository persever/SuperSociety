class UsersController < ApplicationController
  def new
    redirect_to root_url if current_user
    @user = User.new
  end

  def index
    redirect_to root_url if current_user
  end

  # def filepicker
  # end

  def create
    if params[:submission] == "Sign Up"
      # render :filepicker
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        # if flash.now[:errors].include?("Password can't be blank")
        #   flash.now[:errors].delete("Password is too short (minimum is 6 characters)")
        # end
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
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :filepicker_url)
    end
end
