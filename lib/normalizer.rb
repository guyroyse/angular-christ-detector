class AntichristName

  attr_writer :raw_name

  def initialize raw_name = nil
    @raw_name = raw_name
  end

  def normalized_name
    @raw_name.upcase.gsub /\s/, ''
  end

end
