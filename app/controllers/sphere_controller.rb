class SphereController < ApplicationController
  
  def home    
  end

  def experiment
  	render layout: 'experiment'
  end
end