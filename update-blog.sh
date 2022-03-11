#!/bin/sh
# SPDX-FileCopyrightText: LoopBack Contributors
# SPDX-License-Identifier: MIT

set -eu
export POSIXLY_CORRECT=1

# Modifiable Parameters
VENDOR_REPO_REMOTE_URL='https://github.com/loopbackio/loopback-blog.git'
VENDOR_REPO_REMOTE_BRANCH='main'
VENDOR_PATH='vendor/blog-repo'
OUTPUT_PATH='blog'
LOGFILE_PATH='.update-blog.log'
# END Modifiable Parameters

# Get directory of this script and append it 
SCRIPT_PATH=$(dirname "$0")
VENDOR_PATH="$SCRIPT_PATH/$VENDOR_PATH"
OUTPUT_PATH="$SCRIPT_PATH/$OUTPUT_PATH"
LOGFILE_PATH="$SCRIPT_PATH/$LOGFILE_PATH"

exec 3>&1 4>&2 5>>"$LOGFILE_PATH"

debug() {
    # shellcheck disable=2059
    printf "$*\n" >&3
    # shellcheck disable=2059
    printf "$*\n" >&5
}

error() {
    debug "\e[1;31mError: $*\e[0m"
}

debug '\e[1m----- LoopBack Blog Updater Script -----\e[0m'

if [ -e "$LOGFILE_PATH" ]; then
    debug "Removing old log file ($LOGFILE_PATH)"
    rm "$LOGFILE_PATH"
fi

# Enable verbose on CI pipelines only
if [ "${CI:=}" ]; then
    debug "CI verbose logging enabled. To disable, \"unset CI\""
    set -x
else
    debug "CI verbose logging disabled. To enable, \"CI=1 $0\""
    exec >>"$LOGFILE_PATH" 2>>"$LOGFILE_PATH"
fi

# Check for compatible NPM version
if [ ! "$(command -v npm)" ]; then
    error '"npm" is not installed / not in PATH!' 
    exit 1
else
    NPM_MAJOR_VERSION="$(npm --version)"
    if [ "${NPM_MAJOR_VERSION%%.*}" -lt 7 ]; then
        error "\"npm\" version ($(npm --version)) too old; Use v7 or above." 
        exit 1
    fi
fi

if [ -e "$VENDOR_PATH" ] \
    && debug "Vendor path exists. Attempting to remove..." \
    && [ ! "$(rmdir "$VENDOR_PATH" 2>/dev/null)" ] \
    && debug "Not a blank directory. Investigating further..."; then # If vendor path already exists and can't be deleted
    # Otherwise, check if it's a Git repository with a matching "origin" remote URL
    debug "Checking if it's a workable Git repository..."
    if [ "$(git -C "$VENDOR_PATH" --git-dir=.git remote get-url origin)" != "$VENDOR_REPO_REMOTE_URL" ]; then
        if [ $? -eq 2 ]; then # If it's not a Git repository (i.e. The Git command returned non-zero)
            error "\"$VENDOR_PATH\" is a non-empty directory that is not a Git repository. Please remove this directory manually."
            exit 1
        elif [ $? -eq 1 ]; then # If it is the wrong "origin" remote URL
            error "\"$VENDOR_PATH\" has an unexpected \"origin\" remote URL. Please remove this directory manually."
            exit 1
        fi
    fi
    
    if [ "$(git -C "$VENDOR_PATH" --git-dir=.git status --porcelain)" != '' ]; then # If there are are uncommitted changes 
        error "\"$VENDOR_PATH\" has uncommitted changes."
        exit 1
    fi

    debug "We can work with this!"

    if [ "$(git branch --show-current)" != "$VENDOR_REPO_REMOTE_BRANCH" ]; then
        debug "Checking out \"$VENDOR_REPO_REMOTE_BRANCH\"..."
    fi

    debug "Pulling latest changes..."
    cd "$VENDOR_PATH"
    git checkout \
        -B "$VENDOR_REPO_REMOTE_BRANCH" \
        --track origin/"$VENDOR_REPO_REMOTE_BRANCH"
    git pull \
        --ff-only \
        --depth=1 \
        origin \
        "$VENDOR_REPO_REMOTE_BRANCH" 
    cd -
else # If the directory does not already exist 
    debug "Cloning Git repository to \"$OUTPUT_PATH\"..."
    git clone \
        --branch="$VENDOR_REPO_REMOTE_BRANCH" \
        --depth=1 \
        "$VENDOR_REPO_REMOTE_URL" \
        "$VENDOR_PATH" 
fi

cd "$VENDOR_PATH"

debug "Installing dependencies..."
if [ ! "$(npm ci --ignore-scripts)" ]; then
    error "Installation failed."
    exit 1
fi

debug "Building blog..."
if [ ! "$(npm run-script build)" ]; then
    error "Build failed."
    exit 1
fi

cd - 

if [ -d "$OUTPUT_PATH" ]; then
    debug "Deleting existing blog directory ($OUTPUT_PATH)..."
    rm -rf "$OUTPUT_PATH"
fi

debug "Copying built site..."
if [ "$(cp -r "$VENDOR_PATH/build/." "$OUTPUT_PATH")" ]; then
    error "Copy failed."
    exit 1
fi

debug "Done!"

debug '\e[1m----- END LoopBack Blog Updater Script -----\e[3m'
exec >&3 2>&4 3>&- 4>&- 5>&-
