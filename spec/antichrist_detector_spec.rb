# encoding: UTF-8

describe Antichrist::Name do
  include Antichrist::Name

  it 'uppercases the name' do
    expect(normalize('Bob')).to eq 'BOB'
  end

  it 'strips whitespace from the name' do
    expect(normalize("\t\r\n ")).to eq ''
  end

  it 'leaves numbers in the name' do
    expect(normalize('12345')).to eq '12345'
  end

  it 'strips out extended characters from the name' do
    expect(normalize('ñé')).to eq ''
  end

  it 'strips out symbols and punctuation' do
    expect(normalize('?<>!@#$%^&*()_+-=`~;<>/"')).to eq ''
  end

end
