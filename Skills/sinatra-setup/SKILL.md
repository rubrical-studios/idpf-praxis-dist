---
name: sinatra-setup-for-beginners
description: Set up Ruby Sinatra development environment for beginners with step-by-step guidance, Bundler setup, and troubleshooting
license: Complete terms in LICENSE.txt
---
# Sinatra Setup for Beginners
**Version:** v0.22.0
**Source:** Skills/sinatra-setup/SKILL.md

Guides complete beginners through setting up a Sinatra development environment with detailed explanations and verification steps.
## When to Use This Skill
- User wants to build a Sinatra web application
- User is a beginner and needs Sinatra environment setup
- User asks "How do I set up Sinatra?"
## ASSISTANT Output Format
**CRITICAL:** Format ALL technical instructions as Claude Code copy/paste blocks.
```
TASK: Set up Sinatra project
STEP 1: Copy this entire code block
STEP 2: Open Claude Code
STEP 3: Paste into Claude Code
STEP 4: Report back: What did Claude Code say?
```
## Setup Steps
### Step 1: Verify Ruby
```bash
ruby --version
```
Expected: `ruby 3.0.0` or higher
**Installation:**
- **Windows:** RubyInstaller from rubyinstaller.org
- **Mac:** `brew install ruby`
- **Linux:** `sudo apt-get install ruby-full`
### Step 2: Install Bundler
```bash
gem install bundler
```
Wait 10-30 seconds. Verify: `bundler --version`
### Step 3: Create Gemfile
Create file named exactly `Gemfile` (capital G, no extension) in project root:
```ruby
source 'https://rubygems.org'
gem 'sinatra'
```
### Step 4: Install Dependencies
```bash
bundle install
```
Wait 30-90 seconds. Creates `Gemfile.lock`.
### Step 5: Create app.rb
Create `app.rb` in project folder.
**Project structure:**
```
my-project/
├── Gemfile
├── Gemfile.lock
└── app.rb
```
### Step 6: Verify Installation
```bash
ruby --version        # Ruby 3.0+
bundle --version      # Bundler 2.X.X
bundle list           # Shows sinatra
ruby -e "require 'sinatra'; puts 'Sinatra works!'"
```
## Common Issues
| Issue | Solution |
|-------|----------|
| Ruby not installed | Install from rubyinstaller.org (Windows), brew (Mac), apt-get (Linux) |
| "Could not locate Gemfile" | Make sure you're in project directory |
| Permission errors | Use `bundle install --path vendor/bundle` |
| "gem: command not found" | Ruby not installed properly |
## Project Structure (After Setup)
```
my-project/
├── Gemfile           <- Gem dependencies
├── Gemfile.lock      <- Version lock
├── app.rb            <- Your code
├── views/            <- Templates (.erb files)
└── public/           <- Static files (CSS, images)
```
## Resources
See `resources/verification-checklist.md` for detailed troubleshooting.
## Next Steps
After setup: Create first Sinatra route, learn Sinatra DSL, build first web page.
**Remember:** Run `bundle exec ruby app.rb` to start your Sinatra app!
---
**End of Sinatra Setup for Beginners Skill**
