$ErrorActionPreference = "Stop"

Write-Host "Compiling TypeScript..." -ForegroundColor Green
& npm run build
if ($LASTEXITCODE -ne 0) {
    throw "npm run build failed with exit code $LASTEXITCODE"
}

Write-Host "Linting TypeScript..." -ForegroundColor Green
& npm run lint
if ($LASTEXITCODE -ne 0) {
    throw "npm run lint failed with exit code $LASTEXITCODE"
}

Write-Host "Build successful." -ForegroundColor Green
