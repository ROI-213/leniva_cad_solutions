Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791021558718.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham5-work"

# Exact right-hand boundaries of the 3 columns:
# Col 1 right edge is ~337
# Col 2 right edge is ~671
# Col 3 right edge is ~1005
# Left edge where text ends:
# Col 1: x = 195 (w = 337 - 195 = 142)
# Col 2: x = 529 (w = 671 - 529 = 142)
# Col 3: x = 863 (w = 1005 - 863 = 142)
#
# Rows:
# Row 1: y = 97, h = 111
# Row 2: y = 218, h = 111

$crops = @(
    @{ name = "01-mechanical-components"; x = 195; y = 97; w = 142; h = 111 },
    @{ name = "02-product-enclosures"; x = 529; y = 97; w = 142; h = 111 },
    @{ name = "03-jigs-fixtures"; x = 863; y = 97; w = 142; h = 111 },
    @{ name = "04-automotive-ducting"; x = 195; y = 218; w = 142; h = 111 },
    @{ name = "05-turbine-impellers"; x = 529; y = 218; w = 142; h = 111 },
    @{ name = "06-stem-assemblies"; x = 863; y = 218; w = 142; h = 111 }
)

foreach ($c in $crops) {
    $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $c.w, $c.h)
    $cropped = $src.Clone($rect, $src.PixelFormat)
    
    # Upscale 4x for crystal clear HD rendering
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
    $hd.Dispose()
    $cropped.Dispose()
    
    Write-Host "Processed clean HD: $($c.name)"
}

$src.Dispose()
Write-Host "All clean HD crops created successfully!"
