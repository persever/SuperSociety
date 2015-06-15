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
  end

  def index
    if params[:subscriber]
      @groups = User.find(params[:subscriber][:id]).subscribed_groups
    else
      @groups = Group.all
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      render json: @group
    else
      render json: @group.errors.full_messages, status: :unprecessable_entity
    end
  end

  def destroy
  end

  private

    def group_params
      params.require(:group).permit(:name, :description, :creator_id, :photo_url)
    end
end
