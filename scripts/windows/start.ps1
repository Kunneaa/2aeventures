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

Write-Host "Starting production stack..."
& docker @compose up -d --remove-orphans
Assert-LastExitCode -Step "Docker Compose start"

Write-Host "Running health check..."
Invoke-HealthCheck -EnvValues $envValues

& docker @compose ps
Assert-LastExitCode -Step "Docker Compose status"

$primaryHost = Get-PrimaryHost -EnvValues $envValues
Write-Host "Website is running: https://$primaryHost"
