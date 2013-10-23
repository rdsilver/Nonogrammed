class PuzzlesController < ApplicationController
  # GET /puzzles/1
  # GET /puzzles/1.json
  def show
    puzzle = Puzzle.find(params[:id])
    @puzzle_name = puzzle.name
    @puzzle_difficulty = puzzle.difficulty.to_s
    @puzzle_points = puzzle.points.to_s
    @puzzle_height = puzzle.grid.height
    @puzzle_width = puzzle.grid.width
    @puzzle_solution = puzzle.grid.solution
    @puzzle_number = puzzle.id
    @puzzle_times_solved = puzzle.times_solved
    @puzzle_average_time = puzzle.average_time.round(2) rescue "0"
    @puzzle_size_average_time = Puzzle.average_time_for_size(@puzzle_width).round(2) rescue "0"


    #Fill in number logic (will go into model method)
    @string_for_row = Hash.new("")
    @string_for_column = Hash.new("")
    @puzzle_solution = @puzzle_solution.split('').each_slice(@puzzle_width).map(&:join)
    puts @puzzle_solution
    @puzzle_solution.each_with_index { |string , index|
     ones_array = string.split("0")
     ones_array.each do |x|
       if(x.length>0)
       @string_for_row[index] += x.length.to_s + " "
       end
     end
    }

    @puzzle_solution = Array.new 
    puzzle.grid.solution.split('').each_slice(@puzzle_width).map(&:join).each { |x|
      @puzzle_solution << x.to_s.scan(/.{1,1}/).join(',').split(',')
    }
    @puzzle_solution = @puzzle_solution.transpose
    @puzzle_solution = @puzzle_solution.flatten
    @puzzle_solution = @puzzle_solution.join('')
    @puzzle_solution = @puzzle_solution.split('').each_slice(@puzzle_height).map(&:join)
    @puzzle_solution.each_with_index { |string , index|
     ones_array = string.split("0")
     ones_array.each do |x|
       if(x.length>0)
       @string_for_column[index] += x.length.to_s + " "
       end
     end
    }

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @puzzle }
    end
  end

  def check_solution
    puzzle = Puzzle.find(params[:id])
    solved = puzzle.grid.solution == params[:solution].to_s
    solved_before = params[:solved_before] == "true"

    if(solved && !solved_before)
      puzzle.increment!(:times_solved, by =1)
      if(puzzle.average_time.nil?)
        puzzle.update_attribute("average_time",params[:time_taken].to_i)
      else
        average_time = (puzzle.average_time/puzzle.times_solved * (puzzle.times_solved-1)) + (params[:time_taken].to_i/puzzle.times_solved)
        puzzle.update_attribute("average_time",average_time)
      end

    end

    respond_to do |format|
      response = { :status => "ok", :message => "Success!", :html => solved}
      format.json { render json: response }
    end
  end

  def get_stats
    puzzle = Puzzle.find(params[:id])
    stats = Array.new

    stats << puzzle.average_time.round(2)
    stats << puzzle.times_solved
    stats << Puzzle.average_time_for_size(puzzle.grid.width).round(2)

    respond_to do |format|
      response = { :status => "ok", :message => "Success!", :html => stats}
      format.json { render json: response }
    end
  end

  def give_hint
    puzzle = Puzzle.find(params[:id])
    possible_hints = Array.new

    params[:solution].to_s.split('').each_with_index do |c,x|
      if(puzzle.grid.solution[x] != c )
        possible_hints << x
      end
    end

    if possible_hints.count > 0
      index = possible_hints.sample
      hint = puzzle.grid.solution[index] + " " + index.to_s
    else
      hint = "-1 -1"
    end

    respond_to do |format|
      response = { :status => "ok", :message => "Success!", :html => hint}
      format.json { render json: response }
    end
  end

  def new_puzzle #New puzzle page
    @count_for_sizes = Hash.new
    @puzzle_width = 5
    (5..20).each do |p|
      @count_for_sizes[p] = Grid.joins(:puzzle).where(width:p).where(puzzles:  {approved:true}).count
    end
  end

  def create_new_puzzle #Tries to create a new puzzle, approval set to false
   solution = params[:solution]
   name = params[:name]
   size = Math.sqrt(solution.length).to_i

   if((solution.count '0').to_i != size*size) 
     p = Puzzle.create(difficulty: size , points: size, times_solved: 0, approved:false, name: name)
     g= Grid.create(height: size, width: size, solution: solution, puzzle_id: p.id)
     p.update_attributes(grid_id: g.id)
   end

   respond_to do |format|
      response = { :status => "ok", :message => "Success!", :html => "Success"}
      format.json { render json: response }
    end

  end


end
