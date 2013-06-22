class User < ActiveRecord::Base
  has_many :puzzles
  attr_accessible :name, :points, :tutorial_completed
  validates :name, :presence => true
end
