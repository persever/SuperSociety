class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subscription_params)
    @subscription.user = current_user
    if @subscription.save
      render json: @subscription
    else
      render json: @subscription.errors.full_messages, status: :unprecessable_entity
    end
  end

  def destroy
    subscription = Subscription.find(params[:id])
    subscription.destroy
    render json: {}
  end

  private

    def subscription_params
      params.require(:subscription).permit(:group_id)
    end

end
