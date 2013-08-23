require 'antichrist_app'
require 'uri'

describe 'Antichrist Detector App' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  context 'when detecting' do

    before :each do
      get URI.escape('/detect/Bob Villa')
    end

    let :content_type do
      last_response.content_type
    end

    let :detection do
      response = JSON.parse last_response.body, :symbolize_names => true
      detection = response[:detection]
    end

    it 'returns ok' do
      expect(last_response).to be_ok
    end

    it 'returns content type of JSON' do
      expect(content_type).to start_with('application/json')
    end

    it 'returns a detection' do
      expect(detection).to_not be_nil
    end

    it 'returns time of detection' do
      expect(detection[:when]).to be <= Time.now.utc.iso8601
    end

    it 'returns the name of the detection' do
      expect(detection[:name]).to eq "Bob Villa"
    end

  end

end
