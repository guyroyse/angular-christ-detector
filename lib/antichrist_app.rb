#!/usr/bin/env ruby
# encoding: UTF-8

require 'sinatra'
require 'json'

get '/detect' do
  content_type 'application/json'
  { :when => Time.now.utc }.to_json
end
