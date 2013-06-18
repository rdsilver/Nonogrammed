require 'test_helper'

class PuzzlesControllerTest < ActionController::TestCase
  setup do
    @puzzle = puzzles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:puzzles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create puzzle" do
    assert_difference('Puzzle.count') do
      post :create, puzzle: { difficulty: @puzzle.difficulty, grid_id: @puzzle.grid_id, points: @puzzle.points }
    end

    assert_redirected_to puzzle_path(assigns(:puzzle))
  end

  test "should show puzzle" do
    get :show, id: @puzzle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @puzzle
    assert_response :success
  end

  test "should update puzzle" do
    put :update, id: @puzzle, puzzle: { difficulty: @puzzle.difficulty, grid_id: @puzzle.grid_id, points: @puzzle.points }
    assert_redirected_to puzzle_path(assigns(:puzzle))
  end

  test "should destroy puzzle" do
    assert_difference('Puzzle.count', -1) do
      delete :destroy, id: @puzzle
    end

    assert_redirected_to puzzles_path
  end
end
