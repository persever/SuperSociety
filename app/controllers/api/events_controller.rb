class Api::EventsController < ApplicationController
  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: @event.errors.full_messages, status: :unprecessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
  end

  def index
    if params[:attender]
      @events = User.find(params[:attender][:id]).joined_events
    else
      @events = Event.all
    end  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors.full_messages, status: :unprecessable_entity
    end
  end

  def destroy
  end

  private

    def event_params
      params.require(:event)
        .permit(:group_id, :title, :datetime, :location, :description)
    end
end
