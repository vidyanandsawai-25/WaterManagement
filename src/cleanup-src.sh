#!/bin/bash

echo "========================================"
echo "Cleanup Script - Remove /src Folder"
echo "========================================"
echo ""

echo "Step 1: Removing /src folder..."
if [ -d "src" ]; then
    rm -rf src
    echo "[SUCCESS] /src folder deleted"
else
    echo "[INFO] /src folder does not exist"
fi
echo ""

echo "Step 2: Clearing Next.js cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "[SUCCESS] .next cache cleared"
else
    echo "[INFO] .next cache does not exist"
fi
echo ""

echo "========================================"
echo "Cleanup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Open browser and refresh (Ctrl+Shift+R)"
echo ""
