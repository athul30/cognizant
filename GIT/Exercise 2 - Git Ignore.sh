#!/bin/bash
# Create a .log file and a log folder in the working directory of Git
cd GitDemo

echo "sample log content" > application.log
mkdir log
echo "sample log content" > log/debug.log

# Update .gitignore to ignore .log files and the log folder
cat >> .gitignore << 'EOF'
*.log
log/
EOF

git status
