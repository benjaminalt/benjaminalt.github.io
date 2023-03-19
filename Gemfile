# gems source for the rest
source 'https://rubygems.org/'

gemspec

group :jekyll_plugins do
  gem 'jekyll-scholar'
  gem 'jekyll-regex-replace'
end

gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem "webrick", "~> 1.7"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end