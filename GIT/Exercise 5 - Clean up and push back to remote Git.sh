#!/bin/bash
cd GitDemo

# Verify master is in a clean state
git status

# List out all the available branches
git branch -a

# Pull the remote git repository to the master
git pull origin master

# Push the pending changes to the remote repository
git push origin master

# Observe if the changes are reflected in the remote repository
git log --oneline --graph --decorate --all
