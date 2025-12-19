# PowerShell script to fix import versions
Write-Host "🔧 Fixing import versions..." -ForegroundColor Yellow

$files = Get-ChildItem -Recurse -Include *.tsx,*.ts -Exclude node_modules

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Fix sonner imports
    $content = $content -replace "from 'sonner@2.0.3'", "from 'sonner'"
    $content = $content -replace 'from "sonner@2.0.3"', 'from "sonner"'
    
    # Fix next-themes imports
    $content = $content -replace "from 'next-themes@0.4.6'", "from 'next-themes'"
    $content = $content -replace 'from "next-themes@0.4.6"', 'from "next-themes"'
    
    # Fix react-hook-form imports
    $content = $content -replace "from 'react-hook-form@7.55.0'", "from 'react-hook-form'"
    $content = $content -replace 'from "react-hook-form@7.55.0"', 'from "react-hook-form"'
    
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content
        $count++
        Write-Host "  ✓ Fixed: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Done! Fixed $count files." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. npm install" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host ""
