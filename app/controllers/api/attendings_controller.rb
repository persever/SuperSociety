class Api::AttendingsController < ApplicationController

  def create
    @attending = Attending.new(attending_params)
    if @attending.save
      render json: @attending
    else
      render json: @attending.errors.full_messages, status: :unprecessable_entity
    end
  end

  def destroy
  end

  private

    def attending_params
      params.require(:attending).permit(:event_id)
    end

end
