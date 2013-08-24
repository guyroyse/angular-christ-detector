# encoding: UTF-8

module Antichrist

  module Name
    def normalize name
      name.upcase.gsub /[^A-Za-z0-9]/, ''
    end
  end

  module Calculator
    def calculate normalized_name
      normalized_name.each_byte.reduce do |total, byte|
        total + byte
      end
    end
  end

  class Detector
    include Antichrist::Name
    include Antichrist::Calculator

    def detect name

      normalized_name = normalize name
      human_number = calculate normalized_name

      { :detection =>
        { :when => Time.now.utc.iso8601,
          :name => name,
          :normalized_name => normalized_name,
          :human_number => human_number } }

    end

  end

end
