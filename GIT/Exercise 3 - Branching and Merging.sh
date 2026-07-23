#!/bin/bash
cd GitDemo

# Branching: create a new branch "GitNewBranch"
git branch GitNewBranch

# List all local and remote branches
git branch -a

# Switch to the newly created branch
git checkout GitNewBranch

# Add some files to it with some content
echo "content added in GitNewBranch" > branch-file.txt
git add branch-file.txt

# Commit the changes to the branch
git commit -m "Add branch-file.txt in GitNewBranch"

# Check status
git status

# Merging: switch to master
git checkout master

# List out all differences between trunk and branch (command line)
git diff master GitNewBranch

# List out all visual differences between master and branch using P4Merge tool
git difftool master GitNewBranch

# Merge the source branch to the trunk
git merge GitNewBranch

# Observe the logging after merging
git log --oneline --graph --decorate

# Delete the branch after merging with the trunk
git branch -d GitNewBranch

git status
