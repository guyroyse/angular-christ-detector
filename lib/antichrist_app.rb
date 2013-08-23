#!/usr/bin/env ruby
# encoding: UTF-8

require 'sinatra'
require 'json'

get '/detect' do
  content_type 'application/json'
  detection = { :when => Time.now.utc.iso8601 }
  { :detection => detection }.to_json
end
