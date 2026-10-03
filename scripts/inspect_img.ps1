Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791020693297.png"
$img = [System.Drawing.Image]::FromFile($filePath)
Write-Host "Width: $($img.Width) Height: $($img.Height)"
$img.Dispose()
