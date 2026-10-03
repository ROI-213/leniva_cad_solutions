Add-Type -AssemblyName System.Drawing

function Get-Dims($path) {
    $img = [System.Drawing.Image]::FromFile($path)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    return @($w, $h)
}

$dims5 = Get-Dims "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791021558718.png"
$dims6 = Get-Dims "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791020693297.png"

Write-Host "Pratham 5.0 Ref dimensions: $($dims5[0]) x $($dims5[1])"
Write-Host "Pratham 6.0 Ref dimensions: $($dims6[0]) x $($dims6[1])"
