class PuzzlesController < ApplicationController
  # GET /puzzles
  # GET /puzzles.json
  def index
    @puzzles = Puzzle.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @puzzles }
    end
  end

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

  # GET /puzzles/new
  # GET /puzzles/new.json
  def new
    @puzzle = Puzzle.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @puzzle }
    end
  end

  # GET /puzzles/1/edit
  def edit
    @puzzle = Puzzle.find(params[:id])
  end

  # POST /puzzles
  # POST /puzzles.json
  def create
    @puzzle = Puzzle.new(params[:puzzle])

    respond_to do |format|
      if @puzzle.save
        format.html { redirect_to @puzzle, notice: 'Puzzle was successfully created.' }
        format.json { render json: @puzzle, status: :created, location: @puzzle }
      else
        format.html { render action: "new" }
        format.json { render json: @puzzle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /puzzles/1
  # PUT /puzzles/1.json
  def update
    @puzzle = Puzzle.find(params[:id])

    respond_to do |format|
      if @puzzle.update_attributes(params[:puzzle])
        format.html { redirect_to @puzzle, notice: 'Puzzle was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @puzzle.errors, status: :unprocessable_entity }
      end
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

  # DELETE /puzzles/1
  # DELETE /puzzles/1.json
  def destroy
    @puzzle = Puzzle.find(params[:id])
    @puzzle.destroy

    respond_to do |format|
      format.html { redirect_to puzzles_url }
      format.json { head :no_content }
    end
  end
end
