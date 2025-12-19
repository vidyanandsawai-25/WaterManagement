#!/bin/bash

# Fix sonner@2.0.3 imports to just sonner
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i "s/from 'sonner@2.0.3'/from 'sonner'/g"
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "sonner@2.0.3"/from "sonner"/g'

# Fix next-themes@0.4.6 imports
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i "s/from 'next-themes@0.4.6'/from 'next-themes'/g"
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "next-themes@0.4.6"/from "next-themes"/g'

# Fix react-hook-form@7.55.0 imports
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i "s/from 'react-hook-form@7.55.0'/from 'react-hook-form'/g"
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "react-hook-form@7.55.0"/from "react-hook-form"/g'

echo "✅ All imports fixed!"
