# Wedding-prep static site deploy script.
# Keep this file pure ASCII: do not type Chinese characters into it.
#
# Usage (from project root, normal PowerShell):
#   npm run build
#   powershell -NoProfile -ExecutionPolicy Bypass -File deploy-now.ps1
#
# The server password is baked in below so anyone can deploy with one command.
# Override it with:  $env:DEPLOY_PASS = "xxx"

param(
  [string]$Server = '1.13.245.73',
  [string]$User = 'Administrator',
  [string]$Password = $(if ($env:DEPLOY_PASS) { $env:DEPLOY_PASS } else { '!Gxy55668760' }),
  [string]$SiteRoot = 'C:\inetpub\wwwroot',
  [string]$LocalDist = 'dist'
)

$ErrorActionPreference = 'Stop'
$logPath = Join-Path $PSScriptRoot 'deploy.log'

function Write-Log {
  param([string]$Message)
  $line = '[{0}] {1}' -f (Get-Date).ToString('yyyy-MM-dd HH:mm:ss'), $Message
  Write-Host $line
  Add-Content -Path $logPath -Value $line -Encoding UTF8
}

function Fail {
  param([string]$Message)
  Write-Log "ERROR: $Message"
  Write-Log 'RESULT=FAILED'
  exit 1
}

if (Test-Path $logPath) { Remove-Item $logPath -Force }
Write-Log '=== deploy start ==='

# --- 1. local build output -------------------------------------------------
$distFull = Join-Path $PSScriptRoot $LocalDist
if (-not (Test-Path (Join-Path $distFull 'index.html'))) {
  Fail "dist not found or missing index.html: $distFull . Run 'npm run build' first."
}
$assetDir = Join-Path $distFull 'assets'
if (-not (Test-Path $assetDir)) { Fail "assets folder not found in $distFull" }
$localCount = (Get-ChildItem $distFull -Recurse -File).Count
Write-Log "local files: $localCount ($distFull)"

# --- 2. credentials --------------------------------------------------------
if (-not $Password) { Fail 'password is empty. Set $env:DEPLOY_PASS before running.' }
$secure = ConvertTo-SecureString $Password -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential($User, $secure)

# --- 3. trust the host once ------------------------------------------------
try {
  $trusted = (Get-Item WSMan:\localhost\Client\TrustedHosts -ErrorAction SilentlyContinue).Value
  if ($trusted -notlike "*$Server*") {
    Set-Item WSMan:\localhost\Client\TrustedHosts -Value $Server -Force -ErrorAction Stop
    Write-Log "added $Server to TrustedHosts"
  }
} catch {
  Write-Log "WARN: cannot update TrustedHosts ($($_.Exception.Message)). If the next step fails, run as Administrator: Set-Item WSMan:\localhost\Client\TrustedHosts -Value '$Server' -Force"
}

# --- 4. connect ------------------------------------------------------------
try {
  $session = New-PSSession -ComputerName $Server -Credential $cred -SessionOption (New-PSSessionOption -SkipCACheck -SkipCNCheck)
  Write-Log "connected to $Server"
} catch {
  Fail "cannot connect to ${Server}: $($_.Exception.Message)"
}

try {
  # --- 5. backup -----------------------------------------------------------
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $backup = Invoke-Command -Session $session -ScriptBlock {
    param($root, $stamp)
    if (-not (Test-Path $root)) { New-Item -ItemType Directory -Path $root -Force | Out-Null }
    $items = Get-ChildItem $root -Force -ErrorAction SilentlyContinue
    if ($items -and $items.Count -gt 0) {
      $bak = "C:\inetpub\wwwroot.bak.$stamp"
      Copy-Item -Path $root -Destination $bak -Recurse -Force
      return $bak
    }
    return ''
  } -ArgumentList $SiteRoot, $stamp
  if ($backup) { Write-Log "backup -> $backup" } else { Write-Log 'site root empty, nothing to back up' }

  # --- 6. clear ------------------------------------------------------------
  Invoke-Command -Session $session -ScriptBlock {
    param($root)
    Get-ChildItem $root -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
  } -ArgumentList $SiteRoot
  Write-Log 'site root cleared'

  # --- 7. upload -----------------------------------------------------------
  Invoke-Command -Session $session -ScriptBlock {
    param($root)
    if (-not (Test-Path $root)) { New-Item -ItemType Directory -Path $root -Force | Out-Null }
  } -ArgumentList $SiteRoot

  Copy-Item -Path (Join-Path $distFull '*') -Destination $SiteRoot -ToSession $session -Recurse -Force
  Write-Log 'upload finished'

  # --- 8. verify -----------------------------------------------------------
  $verify = Invoke-Command -Session $session -ScriptBlock {
    param($root)
    $files = Get-ChildItem $root -Recurse -File -ErrorAction SilentlyContinue
    $index = Join-Path $root 'index.html'
    return @{
      count = ($files | Measure-Object).Count
      index = (Test-Path $index)
      bytes = (($files | Measure-Object -Property Length -Sum).Sum)
    }
  } -ArgumentList $SiteRoot

  if (-not $verify.index) { Fail 'index.html missing on server after upload' }
  if ($verify.count -lt $localCount) {
    Fail "file count mismatch: local $localCount vs remote $($verify.count)"
  }
  Write-Log "remote files: $($verify.count), total bytes: $($verify.bytes)"
} finally {
  Remove-PSSession $session
}

Write-Log 'RESULT=SUCCESS'
Write-Log '=== deploy done ==='
