Set-StrictMode -Version Latest

function Get-ProjectRoot {
    return (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

function Get-ComposeArgs {
    return @(
        "compose",
        "--env-file", ".env",
        "-f", "docker-compose.yml",
        "-f", "docker-compose.prod.yml"
    )
}

function Read-DotEnv {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $values = @{}

    Get-Content -LiteralPath $Path | ForEach-Object {
        $line = $_.Trim()

        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line -split "=", 2
            if ($parts.Count -eq 2) {
                $key = $parts[0].Trim()
                $value = $parts[1].Trim().Trim('"').Trim("'")

                if ($key) {
                    $values[$key] = $value
                }
            }
        }
    }

    return $values
}

function Assert-EnvFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Root
    )

    $envPath = Join-Path $Root ".env"
    $examplePath = Join-Path $Root ".env.example"

    if (-not (Test-Path -LiteralPath $envPath)) {
        Copy-Item -LiteralPath $examplePath -Destination $envPath
        throw "Missing .env. Created one from .env.example. Edit .env with your real domain, then run the script again."
    }

    return $envPath
}

function Assert-ProductionEnv {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable]$EnvValues
    )

    $appHosts = $EnvValues["APP_HOSTS"]
    $adminToken = $EnvValues["BACKEND_ADMIN_TOKEN"]

    if (-not $appHosts -or $appHosts -eq "example.com,www.example.com" -or $appHosts -eq ":80") {
        throw "APP_HOSTS must be set to your real domain in .env. Example: APP_HOSTS=2aeventures.com,www.2aeventures.com"
    }

    if (-not $adminToken -or $adminToken -eq "change-this-admin-token") {
        throw "BACKEND_ADMIN_TOKEN must be changed in .env before production deploy."
    }
}

function Test-DockerReady {
    docker info *> $null
    return ($LASTEXITCODE -eq 0)
}

function Assert-DockerCli {
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        throw "Docker CLI was not found. Install Docker Desktop for Windows, then open a new PowerShell window."
    }
}

function Assert-LastExitCode {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Step
    )

    if ($LASTEXITCODE -ne 0) {
        throw "$Step failed with exit code $LASTEXITCODE."
    }
}

function Start-DockerDesktopIfNeeded {
    Assert-DockerCli

    if (Test-DockerReady) {
        return
    }

    $dockerDesktop = Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
    if (Test-Path -LiteralPath $dockerDesktop) {
        Write-Host "Starting Docker Desktop..."
        Start-Process -FilePath $dockerDesktop | Out-Null
    }

    Write-Host "Waiting for Docker daemon..."
    for ($attempt = 1; $attempt -le 60; $attempt++) {
        if (Test-DockerReady) {
            return
        }

        Start-Sleep -Seconds 2
    }

    throw "Docker daemon is not ready. Open Docker Desktop and run the script again."
}

function New-RuntimeFolders {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Root
    )

    New-Item -ItemType Directory -Force -Path (Join-Path $Root "data") | Out-Null
    New-Item -ItemType Directory -Force -Path (Join-Path $Root "backups") | Out-Null
}

function Get-PrimaryHost {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable]$EnvValues
    )

    return (($EnvValues["APP_HOSTS"] -split ",")[0]).Trim()
}

function Invoke-HealthCheck {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable]$EnvValues
    )

    $primaryHost = Get-PrimaryHost -EnvValues $EnvValues
    $httpPort = $EnvValues["HTTP_PORT"]
    if (-not $httpPort) {
        $httpPort = "80"
    }

    $uri = "http://127.0.0.1:$httpPort/healthz"

    if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
        & curl.exe -fsS -H "Host: $primaryHost" $uri | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Health check failed: $uri"
        }
        return
    }

    Invoke-WebRequest -Uri $uri -UseBasicParsing -TimeoutSec 20 | Out-Null
}
