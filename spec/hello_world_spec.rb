describe 'The HelloWorld App' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it "says hello" do
    get '/hello'
    last_response.should be_ok
    last_response.body.should == 'Hello World!'
  end

end
