require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module Player
  class Application < Rails::Application
    config.serve_static_assets = true
    config.assets.precompile += [
      'application.css',
      'application.js'
    ]

    config.browserify_rails.source_map_environments << 'development'
  end
end
