Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791020693297.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham6-work"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

Write-Host "Image size: $($src.Width) x $($src.Height)"

# Let's inspect the cards:
# Total width 1024, height 341.
# Card 1: x from ~14 to ~256 (w ≈ 242)
# Card 2: x from ~268 to ~510 (w ≈ 242)
# Card 3: x from ~522 to ~764 (w ≈ 242)
# Card 4: x from ~776 to ~1018 (w ≈ 242)

# Top image height:
# Top rounded corner starts at y ≈ 108.
# The image content goes down to y ≈ 212.
# Let's crop y = 108 to 212 (height = 104) so that the blue icon (y starts ~205-210) does NOT show in the crop,
# while the machine photo, the 01/02/03/04 watermark, and the circular zoom callout are cleanly preserved!

$crops = @(
    @{ name = "01-mechanical-prototypes"; x = 14; y = 108; w = 242; h = 104 },
    @{ name = "02-product-prototypes"; x = 268; y = 108; w = 242; h = 104 },
    @{ name = "03-industrial-tooling"; x = 522; y = 108; w = 242; h = 104 },
    @{ name = "04-automotive-applications"; x = 776; y = 108; w = 242; h = 104 }
)

foreach ($c in $crops) {
    $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $c.w, $c.h)
    $cropped = $src.Clone($rect, $src.PixelFormat)
    
    # 4x Upscaling with HighQualityBicubic for ultra HD sharpness
    $targetW = $c.w * 4
    $targetH = $c.h * 4
    $hd = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($hd)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($cropped, 0, 0, $targetW, $targetH)
    $g.Dispose()
    
    $hd.Save("$outDir/$($c.name)-clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
    # Also save as 0X-top-image-hd.png to ensure standard naming
    $hd.Save("$outDir/$($c.name.Substring(0,2))-top-image-hd.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $hd.Dispose()
    $cropped.Dispose()
    
    Write-Host "Processed clean HD: $($c.name)"
}

$src.Dispose()
Write-Host "Done Pratham 6 crops!"
