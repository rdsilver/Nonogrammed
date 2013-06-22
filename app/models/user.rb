class User < ActiveRecord::Base
  attr_accessible :name, :points, :tutorial_completed
  validates :name, :presence => true
end
