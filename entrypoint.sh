#!/bin/bash
if test -f .env; then
  while read line; do
    export "$line"
    echo "Loaded Local variable \"$(echo $line | cut -d '=' -f 1)\" from .env"
  done < '.env'
fi
echo "Environment variables loaded, starting service..."
${@:1}