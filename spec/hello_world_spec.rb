require 'antichrist_app'

describe 'Antichrist Detector App' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it 'returns ok for a detection' do
    get '/detect'
    expect(last_response).to be_ok
  end

  it 'returns content type of JSON for a detection' do
    get '/detect'
    expect(last_response.content_type).to start_with('application/json')
  end

  it 'returns time of detection' do
    get '/detect'
    response = JSON.parse last_response.body
    expect(response['when']).to be <= Time.now.utc.to_s
  end

end
