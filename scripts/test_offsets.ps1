Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791021558718.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham5-work"

# In Card 1:
# Card rect: x=19, y=96, w=320, h=113
# Let's crop x from 165 to 337 (w=172), y from 96 to 209 (h=113)
# Let's test a few X offsets to find where text ends and image background begins

for ($xOff = 160; $xOff -le 180; $xOff += 5) {
    $rect = New-Object System.Drawing.Rectangle((19 + $xOff), 96, (320 - $xOff), 113)
    $c = $src.Clone($rect, $src.PixelFormat)
    $c.Save("$outDir/test-offset-$xOff.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $c.Dispose()
}

$src.Dispose()
Write-Host "Tested offsets!"
