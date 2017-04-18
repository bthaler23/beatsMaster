class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors
    end

  end

  def email_exists
    # debugger
    user_exists = User.email_exists?(params[:email])
    if user_exists
      render json: true
    else
      render json: false
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
