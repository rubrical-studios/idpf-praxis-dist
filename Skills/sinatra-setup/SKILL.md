---
name: sinatra-setup-for-beginners
version: v0.5.0
description: Set up Ruby Sinatra development environment for beginners
---

# Sinatra Setup for Beginners

## When to Use
- User wants to build Sinatra web application
- User needs Ruby/Sinatra environment setup
- User asks "How do I set up Sinatra?"

## Setup Steps

### 1. Verify Ruby
```bash
ruby --version  # Should show Ruby 2.7+
```

### 2. Create Project
```bash
mkdir [project-name]
cd [project-name]
```

### 3. Create Gemfile
```ruby
source 'https://rubygems.org'
gem 'sinatra'
gem 'sinatra-contrib'  # For reloader
```

### 4. Install Gems
```bash
bundle install
```

### 5. Create app.rb
```ruby
require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  'Hello, World!'
end
```

### 6. Run App
```bash
ruby app.rb
```
Open http://localhost:4567

## Troubleshooting
- Ruby not found: Install from rubyinstaller.org (Windows) or rbenv
- Bundler not found: `gem install bundler`
- Port in use: Use different port `ruby app.rb -p 4568`

## Note
Sinatra doesn't auto-reload by default. Use sinatra-reloader gem or restart server after changes.
