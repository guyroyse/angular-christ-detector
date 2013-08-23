#!/usr/bin/env ruby
# encoding: UTF-8

require 'sinatra'
require 'json'

require 'normalizer'

get '/detect/:name' do |name|

  content_type :json

  detection = {
    :when => Time.now.utc.iso8601,
    :name => name,
    :normalized_name => AntichristName.new(name).normalized_name
  }

  { :detection => detection }.to_json

end
