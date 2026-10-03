Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791021558718.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham5-work"

$crops = @(
    @{ name = "01-mechanical-components"; x = 175; y = 96; w = 163; h = 113 },
    @{ name = "02-product-enclosures"; x = 508; y = 96; w = 163; h = 113 },
    @{ name = "03-jigs-fixtures"; x = 842; y = 96; w = 164; h = 113 },
    @{ name = "04-automotive-ducting"; x = 175; y = 217; w = 163; h = 113 },
    @{ name = "05-turbine-impellers"; x = 508; y = 217; w = 163; h = 113 },
    @{ name = "06-stem-assemblies"; x = 842; y = 217; w = 164; h = 113 }
)

foreach ($c in $crops) {
    $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $c.w, $c.h)
    $cropped = $src.Clone($rect, $src.PixelFormat)
    
    # Save standard crop
    $cropped.Save("$outDir/$($c.name).png", [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Upscale 3x to high definition (HD) with HighQualityBicubic smoothing
    $targetW = $c.w * 3
    $targetH = $c.h * 3
    $hd = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($hd)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($cropped, 0, 0, $targetW, $targetH)
    $g.Dispose()
    
    $hd.Save("$outDir/$($c.name)-hd.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $hd.Dispose()
    $cropped.Dispose()
    
    Write-Host "Processed $($c.name)"
}

$src.Dispose()
Write-Host "Done all 6 exact HD crops!"
