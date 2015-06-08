class Api::EventsController < ApplicationController
  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to event_url(@event)
    else
      flash.now[:errors] = @event.errors.full_messages
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def index
    @events = Event.all
    render json: @events
  end

  private

    def event_params
      params.require(:event).permit(:group_id, :title, :date,
                                    :time, :location, :description)
    end
end
