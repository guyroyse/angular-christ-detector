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

  module Designator
    def designate human_number
      designation = :human
      designation = :antichrist if human_number == 666
      designation = :christ if human_number == 777
      designation
    end
  end

  class Detector
    include Antichrist::Name
    include Antichrist::Calculator
    include Antichrist::Designator

    def detect name
      detection = Antichrist::Detection.new
      detection.when = Time.now.utc.iso8601
      detection.name = name
      detection.normalized_name = normalize name
      detection.human_number = calculate detection.normalized_name
      detection.designation = designate detection.human_number
      detection
    end

  end

  class Detection

    attr_accessor :when, :name, :normalized_name, :human_number, :designation

    def to_json
      { :detection =>
        { :when => @when,
          :name => @name,
          :normalized_name => @normalized_name,
          :human_number => @human_number,
          :designation => @designation } }.to_json
    end

  end

end
