describe AntichristName do

  it 'uppercases the name' do
    subject.raw_name = 'Bob'
    expect(subject.normalized_name).to eq 'BOB'
  end

  it 'strips whitespace from the name' do
    subject.raw_name = "Bob\tVilla\r\n "
    expect(subject.normalized_name).to eq 'BOBVILLA'
  end

end
