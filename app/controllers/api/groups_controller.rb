class Api::GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_url(@group)
    else
      flash.now[:errors] = @group.errors.full_messages
      render :new
    end
  end

  def show
    @group = Group.find(params[:id])
  end

  def index
    @groups = Group.all
    render json: @groups
  end

  private

    def group_params
      params.require(:group).permit(:name, :description, :creator_id)
    end
end
