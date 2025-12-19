# PowerShell Migration Script for Windows
# Run this with: .\migrate.ps1

Write-Host "🚀 Starting migration to src/ structure..." -ForegroundColor Green
Write-Host ""

# Create directory structure
Write-Host "📁 Creating folder structure..." -ForegroundColor Yellow

$folders = @(
    "src\components\features\applications",
    "src\components\features\approvals",
    "src\components\features\dashboard",
    "src\components\features\documents",
    "src\components\features\payment",
    "src\components\features\reports",
    "src\components\common",
    "src\components\layout",
    "src\components\ui",
    "src\components\figma",
    "src\config",
    "src\data",
    "src\hooks",
    "src\imports",
    "src\services",
    "src\styles",
    "src\types",
    "src\utils"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  ✓ Created $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Folder structure created!" -ForegroundColor Green
Write-Host ""

# Copy data
Write-Host "📦 Copying data..." -ForegroundColor Yellow
if (Test-Path "data\applications.ts") {
    Copy-Item "data\applications.ts" "src\data\" -Force
    Write-Host "  ✓ Copied applications.ts" -ForegroundColor Green
}

# Copy config
Write-Host "⚙️ Copying config..." -ForegroundColor Yellow
if (Test-Path "config\api.config.ts") {
    Copy-Item "config\api.config.ts" "src\config\" -Force
    Write-Host "  ✓ Copied api.config.ts" -ForegroundColor Green
}

# Copy hooks
Write-Host "🪝 Copying hooks..." -ForegroundColor Yellow
if (Test-Path "hooks\") {
    Copy-Item "hooks\*" "src\hooks\" -Force
    Write-Host "  ✓ Copied all hooks" -ForegroundColor Green
}

# Copy imports
Write-Host "📥 Copying imports..." -ForegroundColor Yellow
if (Test-Path "imports\") {
    Copy-Item "imports\*" "src\imports\" -Force -Recurse
    Write-Host "  ✓ Copied all imports" -ForegroundColor Green
}

# Copy services
Write-Host "🌐 Copying services..." -ForegroundColor Yellow
if (Test-Path "services\") {
    Copy-Item "services\*" "src\services\" -Force
    Write-Host "  ✓ Copied all services" -ForegroundColor Green
}

# Copy types
Write-Host "📝 Copying types..." -ForegroundColor Yellow
if (Test-Path "types\index.ts") {
    Copy-Item "types\index.ts" "src\types\" -Force
    Write-Host "  ✓ Copied types" -ForegroundColor Green
}

# Copy utils
Write-Host "🔧 Copying utils..." -ForegroundColor Yellow
if (Test-Path "utils\") {
    Copy-Item "utils\*" "src\utils\" -Force
    Write-Host "  ✓ Copied all utils" -ForegroundColor Green
}

# Copy styles
Write-Host "🎨 Copying styles..." -ForegroundColor Yellow
if (Test-Path "styles\globals.css") {
    Copy-Item "styles\globals.css" "src\styles\" -Force
    Write-Host "  ✓ Copied globals.css" -ForegroundColor Green
}

# Copy UI components
Write-Host "🎨 Copying UI components..." -ForegroundColor Yellow
if (Test-Path "components\ui\") {
    Copy-Item "components\ui\*" "src\components\ui\" -Force -Recurse
    Write-Host "  ✓ Copied all UI components" -ForegroundColor Green
}

# Copy Figma components
Write-Host "🎨 Copying Figma components..." -ForegroundColor Yellow
if (Test-Path "components\figma\") {
    Copy-Item "components\figma\*" "src\components\figma\" -Force -Recurse
    Write-Host "  ✓ Copied Figma components" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Basic files copied!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Now copy feature components manually:" -ForegroundColor Yellow
Write-Host "  1. Copy application components to src\components\features\applications\" -ForegroundColor Cyan
Write-Host "  2. Copy approval components to src\components\features\approvals\" -ForegroundColor Cyan
Write-Host "  3. Copy dashboard components to src\components\features\dashboard\" -ForegroundColor Cyan
Write-Host "  4. Copy document components to src\components\features\documents\" -ForegroundColor Cyan
Write-Host "  5. Copy payment components to src\components\features\payment\" -ForegroundColor Cyan
Write-Host "  6. Copy report components to src\components\features\reports\" -ForegroundColor Cyan
Write-Host "  7. Copy common components to src\components\common\" -ForegroundColor Cyan
Write-Host "  8. Copy Sidebar.tsx to src\components\layout\" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Update imports in all files (use VS Code Find & Replace)" -ForegroundColor Cyan
Write-Host "  2. Run: npm run type-check" -ForegroundColor Cyan
Write-Host "  3. Run: npm run dev" -ForegroundColor Cyan
Write-Host "  4. Test all features" -ForegroundColor Cyan
Write-Host "  5. Delete old folders after confirming everything works" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Migration script complete!" -ForegroundColor Green
Write-Host "📚 See FINAL_MIGRATION_SUMMARY.md for detailed instructions" -ForegroundColor Yellow
