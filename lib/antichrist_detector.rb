class AntichristName

  attr_writer :raw_name

  def initialize raw_name = nil
    @raw_name = raw_name
  end

  def normalized_name
    @raw_name.upcase.gsub /\s/, ''
  end

end

class AntichristDetector

  def detect name

    ac_name = AntichristName.new name

    { :detection =>
      { :when => Time.now.utc.iso8601,
        :name => ac_name.raw_name,
        :normalized_name => ac_name.normalized_name } }

  end

end
