---
name: sinatra-setup-for-beginners
description: Set up Ruby Sinatra development environment for beginners with step-by-step guidance, Bundler setup, and troubleshooting
license: Complete terms in LICENSE.txt
---

# Sinatra Setup for Beginners
**Version:** v0.23.0

## When to Use

- User wants to build a Sinatra web application
- User is a beginner and needs Sinatra environment setup
- User asks "How do I set up Sinatra?"

## Instructions for ASSISTANT

**Format ALL technical instructions as Claude Code copy/paste blocks.**

```
TASK: Set up Sinatra project

STEP 1: Copy this entire code block
STEP 2: Open Claude Code
STEP 3: Paste into Claude Code
STEP 4: Report back: What did Claude Code say?

---
cd [project-location]
mkdir [project-name]
cd [project-name]
ruby --version
[continue with commands...]
```

## Setup Steps

### 1. Verify Ruby
```bash
ruby --version
```
Expected: `ruby 3.0.0` or higher

**If Ruby NOT installed:**
- **Windows:** Download RubyInstaller from https://rubyinstaller.org/
- **Mac:** `brew install ruby`
- **Linux:** `sudo apt-get install ruby-full`

### 2. Install Bundler
```bash
gem install bundler
```

### 3. Create Gemfile

Create file named `Gemfile` (no extension):
```ruby
source 'https://rubygems.org'

gem 'sinatra'
```

### 4. Install Sinatra
```bash
bundle install
```

### 5. Verify Installation
```bash
ruby --version
bundle --version
bundle list
ruby -e "require 'sinatra'; puts 'Sinatra works!'"
```

## Project Structure

```
my-project/
├── Gemfile           <- Gem dependencies
├── Gemfile.lock      <- Version lock
└── app.rb            <- Your code
```

Later add:
```
├── views/            <- Templates (.erb files)
└── public/           <- Static files (CSS, images)
```

## Common Issues

1. **Ruby not installed** - Follow installation instructions
2. **Gemfile in wrong location** - Must be in project root
3. **Permission errors** - Use `bundle install --path vendor/bundle`
4. **Old Ruby version** - Update Ruby to 3.0+

## Resources

- `resources/verification-checklist.md`

---

**Remember:** Run `bundle exec ruby app.rb` to start your Sinatra app
