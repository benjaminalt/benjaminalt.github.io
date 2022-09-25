# [benjaminalt.github.io](https://benjaminalt.github.io)

## Installing development environment on a new system

* Download [RubyInstaller](https://rubyinstaller.org/downloads/) for Ruby 2
  * On Ubuntu, you can [use `rbenv` to install Ruby 2](https://www.how2shout.com/linux/3-ways-to-install-ruby-on-ubuntu-22-04-lts-jammy/).
* `gem install jekyll bundler`
* `bundle` to install project dependencies
* `bundle exec jekyll serve`

## How it works
* `bundle exec jekyll serve` generates the `_site` subdirectory, which contains the built website
* Pushing to `master` triggers a GitHub build action which pushes the generated content to the `gh-pages` branch, which is used by GitHub pages to serve the site