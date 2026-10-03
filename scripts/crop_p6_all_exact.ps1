Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791020693297.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham6-work"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

# In Pratham 6.0 reference image (1024 x 341):
# There are 4 vertical cards:
# Card 1: x ≈ 18 to 258
# Card 2: x ≈ 268 to 508
# Card 3: x ≈ 518 to 758
# Card 4: x ≈ 768 to 1008
#
# In each card, the image is at the TOP (y ≈ 108 to 226, height ≈ 118)
# The text is at the BOTTOM (y ≈ 226 to 326)

for ($i = 0; $i -lt 4; $i++) {
    $cardX = 18 + ($i * 250)
    $cardY = 108
    $cardW = 240
    $cardH = 218 # full card
    
    # Crop full card
    $cardRect = New-Object System.Drawing.Rectangle($cardX, $cardY, $cardW, $cardH)
    $cardCrop = $src.Clone($cardRect, $src.PixelFormat)
    $cardCrop.Save("$outDir/card-0$($i+1).png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cardCrop.Dispose()

    # Crop image top half
    $imgRect = New-Object System.Drawing.Rectangle($cardX, $cardY, $cardW, 118)
    $imgCrop = $src.Clone($imgRect, $src.PixelFormat)
    
    # Upscale 3x for HD
    $hd = New-Object System.Drawing.Bitmap(($cardW * 3), (118 * 3), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($hd)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($imgCrop, 0, 0, ($cardW * 3), (118 * 3))
    $g.Dispose()
    
    $hd.Save("$outDir/0$($i+1)-top-image-hd.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $hd.Dispose()
    $imgCrop.Dispose()
    
    Write-Host "Processed P6 Card $($i+1)"
}

$src.Dispose()
Write-Host "Done Pratham 6 crops!"
