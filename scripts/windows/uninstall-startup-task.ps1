param(
    [string]$TaskName = "2AEventures Website"
)

$ErrorActionPreference = "Stop"

Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false

Write-Host "Startup task removed: $TaskName"
