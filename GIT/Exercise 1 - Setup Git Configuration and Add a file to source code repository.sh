#!/bin/bash
# Step 1: Setup machine with Git Configuration
git --version

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git config --global user.name
git config --global user.email

# Step 2: Integrate notepad++.exe to Git and make it a default editor
notepad++

alias notepad++="'/c/Program Files/Notepad++/notepad++.exe'"

git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"

git config --global core.editor

git config --global --list

# Step 3: Add a file to source code repository
mkdir GitDemo
cd GitDemo
git init

ls -la

echo "Welcome to Git" > welcome.txt

ls -la
cat welcome.txt

git status

git add welcome.txt

git commit

git status

# Connect to remote GitLab repository named "GitDemo" and sync
git remote add origin <GITLAB_REPO_URL>
git pull origin master
git push origin master
