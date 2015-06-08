class Api::GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.creator_id = current_user.id
    if @group.save
      render json: @group
    else
      render json: @group.errors.full_messages, status: :unprecessable_entity
    end
  end

  def show
    @group = Group.find(params[:id])
    render json: @group
  end

  def index
    @groups = Group.all
    render json: @groups
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

    def group_params
      params.require(:group).permit(:name, :description, :creator_id)
    end
end
