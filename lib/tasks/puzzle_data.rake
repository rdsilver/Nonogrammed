def make_solution_string(root_of_size)
  s = ""
  length_of_solution = (root_of_size * root_of_size) 
  length_of_solution.times do 
    s += [0,1].sample.to_s
  end
  return s
end

namespace :puzzle_data do 
  task :create_puzzles_and_grids => :environment do
    100.times do
      (5..20).each do |x|
         #Puzzle , id , difficulty, grid_id , points 
         #Grid, id , height , width, solution , puzzle_id
         p = Puzzle.create(difficulty: x , points: x, times_solved: 0)
         solution = make_solution_string(x)
         g= Grid.create(height: x, width: x, solution: solution, puzzle_id: p.id)
         p.update_attributes(grid_id: g.id)
      end
    end
  end
end