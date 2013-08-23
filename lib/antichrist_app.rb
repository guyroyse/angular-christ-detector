#!/usr/bin/env ruby
# encoding: UTF-8

require 'sinatra'
require 'json'

get '/detect/:name' do |name|
  content_type :json
  detection = {
    :when => Time.now.utc.iso8601,
    :name => name
  }
  { :detection => detection }.to_json
end
