param(
    [string]$TaskName = "2AEventures Website"
)

$ErrorActionPreference = "Stop"

. "$PSScriptRoot\common.ps1"

$root = Get-ProjectRoot
$startScript = Join-Path $root "scripts\windows\start.ps1"

if (-not (Test-Path -LiteralPath $startScript)) {
    throw "Cannot find $startScript"
}

$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$startScript`""

$trigger = New-ScheduledTaskTrigger -AtLogOn

$settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Description "Start 2AEventures Docker stack when this Windows user logs in." `
    -Force | Out-Null

Write-Host "Startup task installed: $TaskName"
Write-Host "It will run: $startScript"
