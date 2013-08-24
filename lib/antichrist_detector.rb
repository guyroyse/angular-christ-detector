# encoding: UTF-8

module Antichrist

  module Name
    def normalize name
      name.upcase.gsub /[^A-Za-z0-9]/, ''
    end
  end

  class Calculator

    def initialize normalized_name
      @normalized_name = normalized_name
    end

    def calculate
      587
    end

  end

  class Detector
    include Antichrist::Name

    def detect name

      normalized_name = normalize name
      human_number = Antichrist::Calculator.new(normalized_name).calculate

      { :detection =>
        { :when => Time.now.utc.iso8601,
          :name => name,
          :normalized_name => normalized_name,
          :human_number => human_number } }

    end

  end

end
