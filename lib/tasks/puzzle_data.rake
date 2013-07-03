def make_solution_string(root_of_size)
  s = ""
  (root_of_size * root_of_size).times do 
    s += ["0","1"].sample
  end
end
namespace :puzzle_data do 
  task :create_puzzles_and_grids => :environment do
    50.times do |x|
      #Puzzle , id , difficulty, grid_id , points 
      #Grid, id , height , width, solution , puzzle_id
      Puzzle.create(difficulty: x , grid_id: x , points: x)
      solution = make_solution_string(x)
      Grid.create(height: x+1, width: x+1, solution: solution, puzzle_id: x+1000)
    end
  end
end