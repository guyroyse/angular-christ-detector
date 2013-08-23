# encoding: UTF-8

describe AntichristName do

  it 'uppercases the name' do
    subject.raw_name = 'Bob'
    expect(subject.normalized_name).to eq 'BOB'
  end

  it 'strips whitespace from the name' do
    subject.raw_name = "\t\r\n "
    expect(subject.normalized_name).to eq ''
  end

  it 'leaves numbers in the name' do
    subject.raw_name = '12345'
    expect(subject.normalized_name).to eq '12345'
  end

  it 'strips out extended characters from the name' do
    subject.raw_name = 'ñé'
    expect(subject.normalized_name).to eq ''
  end

end
