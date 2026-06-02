param(
    [switch]$SkipBackup
)

$ErrorActionPreference = "Stop"

. "$PSScriptRoot\common.ps1"

$root = Get-ProjectRoot
Set-Location $root

$envPath = Assert-EnvFile -Root $root
$envValues = Read-DotEnv -Path $envPath
Assert-ProductionEnv -EnvValues $envValues

Start-DockerDesktopIfNeeded
New-RuntimeFolders -Root $root

$compose = Get-ComposeArgs

Write-Host "Validating production compose..."
& docker @compose config | Out-File -Encoding utf8 (Join-Path $env:TEMP "2aeventures-compose.yml")
Assert-LastExitCode -Step "Docker Compose validation"

if (-not $SkipBackup) {
    Write-Host "Creating backup before deploy..."
    & "$PSScriptRoot\backup.ps1"
}

Write-Host "Building and starting production stack..."
& docker @compose up -d --build --remove-orphans
Assert-LastExitCode -Step "Docker Compose deploy"

Write-Host "Running health check..."
Invoke-HealthCheck -EnvValues $envValues

& docker @compose ps
Assert-LastExitCode -Step "Docker Compose status"

$primaryHost = Get-PrimaryHost -EnvValues $envValues
Write-Host "Deploy completed."
Write-Host "Open: https://$primaryHost"
