$ErrorActionPreference = "Stop"

. "$PSScriptRoot\common.ps1"

$root = Get-ProjectRoot
Set-Location $root

New-RuntimeFolders -Root $root

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = Join-Path $root "backups"
$stage = Join-Path $env:TEMP "2aeventures_backup_$timestamp"
$archive = Join-Path $backupDir "2aeventures_$timestamp.zip"

$excludedDirectories = @(
    ".git",
    "node_modules",
    ".next",
    "coverage",
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    "backups"
)

$excludedFiles = @(
    ".env",
    ".DS_Store",
    "*.pyc",
    "*.log",
    "*.pid",
    "*.tsbuildinfo"
)

function Test-ExcludedFile {
    param([string]$Name)

    foreach ($pattern in $excludedFiles) {
        if ($Name -like $pattern) {
            return $true
        }
    }

    return $false
}

function Copy-FilteredTree {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Source,
        [Parameter(Mandatory = $true)]
        [string]$Destination
    )

    New-Item -ItemType Directory -Force -Path $Destination | Out-Null

    Get-ChildItem -LiteralPath $Source -Force | ForEach-Object {
        if ($_.PSIsContainer) {
            if (-not ($excludedDirectories -contains $_.Name)) {
                Copy-FilteredTree -Source $_.FullName -Destination (Join-Path $Destination $_.Name)
            }
        } elseif (-not (Test-ExcludedFile -Name $_.Name)) {
            Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $Destination $_.Name)
        }
    }
}

if (Test-Path -LiteralPath $stage) {
    Remove-Item -LiteralPath $stage -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $stage | Out-Null

$itemsToBackup = @(
    ".env.example",
    ".gitignore",
    "Makefile",
    "README.md",
    "docker-compose.yml",
    "docker-compose.prod.yml",
    "caddy",
    "scripts",
    "backend",
    "frontend",
    "data"
)

foreach ($item in $itemsToBackup) {
    $source = Join-Path $root $item
    if (-not (Test-Path -LiteralPath $source)) {
        continue
    }

    $destination = Join-Path $stage $item
    if ((Get-Item -LiteralPath $source).PSIsContainer) {
        Copy-FilteredTree -Source $source -Destination $destination
    } else {
        Copy-Item -LiteralPath $source -Destination $destination
    }
}

Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $archive -Force
Remove-Item -LiteralPath $stage -Recurse -Force

Write-Host "Backup created: $archive"
