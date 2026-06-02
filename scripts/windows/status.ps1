param(
    [switch]$Logs,
    [string]$Service = "caddy",
    [int]$Tail = 120
)

$ErrorActionPreference = "Stop"

. "$PSScriptRoot\common.ps1"

$root = Get-ProjectRoot
Set-Location $root

$envPath = Assert-EnvFile -Root $root
$envValues = Read-DotEnv -Path $envPath

Start-DockerDesktopIfNeeded

$compose = Get-ComposeArgs

& docker @compose ps
Assert-LastExitCode -Step "Docker Compose status"

if ($Logs) {
    & docker @compose logs "--tail=$Tail" $Service
    Assert-LastExitCode -Step "Docker Compose logs"
}

$primaryHost = Get-PrimaryHost -EnvValues $envValues
Write-Host "Local health: http://127.0.0.1/healthz"
Write-Host "Domain: https://$primaryHost"
