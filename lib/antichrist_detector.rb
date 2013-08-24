# encoding: UTF-8

module Antichrist

  class Name

    attr_accessor :raw_name

    def initialize raw_name = nil
      @raw_name = raw_name
    end

    def normalized_name
      @raw_name.upcase.gsub /[^A-Za-z0-9]/, ''
    end

  end

  module Detector

    def self.detect name

      ac_name = Antichrist::Name.new name

      { :detection =>
        { :when => Time.now.utc.iso8601,
          :name => ac_name.raw_name,
          :normalized_name => ac_name.normalized_name } }

    end

  end

end
