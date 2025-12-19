#!/bin/bash
# Script to replace all label text colors to gray-900 in EditApplicationModal.tsx

sed -i 's/text-blue-700/text-gray-900/g' /components/EditApplicationModal.tsx
sed -i 's/text-purple-700/text-gray-900/g' /components/EditApplicationModal.tsx
sed -i 's/text-green-700/text-gray-900/g' /components/EditApplicationModal.tsx
sed -i 's/text-indigo-700/text-gray-900/g' /components/EditApplicationModal.tsx
