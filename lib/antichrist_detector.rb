# encoding: UTF-8

module Antichrist

  module NameNormalizer
    def normalize name
      Antichrist::Name.new(name).normalized_name
    end
  end

  class Name

    attr_accessor :raw_name

    def initialize raw_name = nil
      @raw_name = raw_name
    end

    def normalized_name
      @raw_name.upcase.gsub /[^A-Za-z0-9]/, ''
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

  module Detector

    def self.detect name

      normalized_name = Antichrist::Name.new(name).normalized_name
      human_number = Antichrist::Calculator.new(normalized_name).calculate

      { :detection =>
        { :when => Time.now.utc.iso8601,
          :name => name,
          :normalized_name => normalized_name,
          :human_number => human_number } }

    end

  end

end
