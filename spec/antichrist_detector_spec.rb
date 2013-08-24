# encoding: UTF-8

describe Antichrist::Name do
  include Antichrist::NameNormalizer

  it 'uppercases the name' do
    expect(normalize('Bob')).to eq 'BOB'
  end

  it 'strips whitespace from the name' do
    expect(normalize("\t\r\n ")).to eq ''
  end

  it 'leaves numbers in the name' do
    subject.raw_name = '12345'
    expect(subject.normalized_name).to eq '12345'
  end

  it 'strips out extended characters from the name' do
    subject.raw_name = 'ñé'
    expect(subject.normalized_name).to eq ''
  end

  it 'strips out symbols and punctuation' do
    subject.raw_name = '?<>!@#$%^&*()_+-=`~;<>/"'
    expect(subject.normalized_name).to eq ''
  end

end
