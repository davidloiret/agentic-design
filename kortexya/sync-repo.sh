#!/bin/bash

# Sync Kortexya repository locally
# This script clones or pulls the latest code from the git repository

set -e

REPO_URL="${REPO_URL:-git@github.com:davidloiret/kortexya.git}"
BRANCH="${BRANCH:-main}"
REPO_DIR="./repo"

echo "🔄 Syncing Kortexya repository..."

# Check if repo directory exists
if [ -d "$REPO_DIR" ]; then
    echo "📂 Repository exists, pulling latest changes..."
    cd "$REPO_DIR"

    # Fetch and reset to latest
    git fetch origin "$BRANCH"
    git reset --hard "origin/$BRANCH"

    echo "✅ Repository updated to latest $BRANCH"
else
    echo "📥 Cloning repository..."
    git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
    echo "✅ Repository cloned successfully"
fi

echo "🎯 Repository ready at: $REPO_DIR"
