class PuzzlesController < ApplicationController
  # GET /puzzles/1
  # GET /puzzles/1.json
  def show
    puzzle = Puzzle.find(params[:id])
    @puzzle_name = puzzle.id.to_s
    @puzzle_difficulty = puzzle.difficulty.to_s
    @puzzle_points = puzzle.points.to_s
    @puzzle_height = puzzle.grid.height
    @puzzle_width = puzzle.grid.width
    @puzzle_solution = puzzle.grid.solution
    @puzzle_number = puzzle.id
    @puzzle_times_solved = puzzle.times_solved


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
    solved= puzzle.grid.solution == params[:solution].to_s

    #
    #if(solved)
    #  Puzzle.find(params[:id]).increment!(:times_solved, by =1)
   # end

  
    respond_to do |format|
      response = { :status => "ok", :message => "Success!", :html => solved}
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


end
