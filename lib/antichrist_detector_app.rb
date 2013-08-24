#!/usr/bin/env ruby
# encoding: UTF-8

require 'sinatra'
require 'json'

require 'antichrist_detector'

get '/detect/:name' do |name|

  content_type :json

  detection = Antichrist::Detector::detect name

  detection.to_json

end
