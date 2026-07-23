#!/bin/bash
cd GitDemo

# Verify master is in a clean state
git status

# Create a branch "GitWork" and add a file "hello.xml"
git branch GitWork
git checkout GitWork
echo "<message>Hello from GitWork branch</message>" > hello.xml
git add hello.xml
git commit -m "Add hello.xml in GitWork branch"

# Update the content of hello.xml and observe the status
echo "<message>Updated content from GitWork branch</message>" > hello.xml
git status

# Commit the changes to reflect in the branch
git add hello.xml
git commit -m "Update hello.xml in GitWork branch"

# Switch to master
git checkout master

# Add a file "hello.xml" to the master with different content
echo "<message>Hello from master branch</message>" > hello.xml
git add hello.xml

# Commit the changes to the master
git commit -m "Add hello.xml in master branch"

# Observe the log
git log --oneline --graph --decorate --all

# Check the differences with Git diff tool
git diff master GitWork

# For better visualization, use P4Merge tool
git difftool master GitWork

# Merge the branch to the master
git merge GitWork

# Observe the git markup (conflict markers) in hello.xml, then resolve manually.
# Use 3-way merge tool to resolve the conflict
git mergetool

# Commit the changes to the master, once done with conflict
git add hello.xml
git commit -m "Resolve merge conflict between master and GitWork"

# Observe the git status and add backup file to the .gitignore file
git status
echo "*.orig" >> .gitignore

# Commit the changes to the .gitignore
git add .gitignore
git commit -m "Ignore merge backup files"

# List out all the available branches
git branch -a

# Delete the branch, which merged to master
git branch -d GitWork

# Observe the log
git log --oneline --graph --decorate
