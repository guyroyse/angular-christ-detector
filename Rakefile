require 'rspec/core'
require 'rspec/core/rake_task'

task :default => :spec

task :spec => [:rspec, :jasmine]

RSpec::Core::RakeTask.new :rspec

task :jasmine do
  exec 'phantomjs run-jasmine.js SpecRunner.html'
end
