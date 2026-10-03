Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity\brain\7a53ac6c-4bd9-4559-a2da-64003d1a9164\.user_uploaded\media_1791021558718.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# The total image is 1024 x 341.
# Header occupies top ~95 pixels.
# The cards occupy from y ≈ 95 to 335.
# There are 2 rows:
# Row 1: y ≈ 95 to 210 (height ≈ 115)
# Row 2: y ≈ 215 to 330 (height ≈ 115)
#
# There are 3 columns:
# Col 1: x ≈ 15 to 335 (width ≈ 320)
# Col 2: x ≈ 350 to 670 (width ≈ 320)
# Col 3: x ≈ 685 to 1005 (width ≈ 320)
#
# Within each card (width ~320):
# Left half is text (x from 0 to ~160)
# Right half is the product image (x from ~160 to ~320)

Write-Host "Bitmap loaded: $($src.Width)x$($src.Height)"

# Let's save a test crop of card 1 right-half image
$outDir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham5-work"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

# Let's crop the exact cards and also individual images
# 6 cards locations:
# We can crop the exact right-half image of each card, or the full card!
$cards = @(
    @{ name = "01-mechanical"; col = 0; row = 0 },
    @{ name = "02-product"; col = 1; row = 0 },
    @{ name = "03-tooling"; col = 2; row = 0 },
    @{ name = "04-automotive"; col = 0; row = 1 },
    @{ name = "05-impeller"; col = 1; row = 1 },
    @{ name = "06-engine"; col = 2; row = 1 }
)

# Card bounding boxes:
# Total width 1024, margin left ≈ 18, card width ≈ 318, gap ≈ 16
# Row 1: y ≈ 96, height ≈ 112
# Row 2: y ≈ 217, height ≈ 112
# Within card: image is at right side: cardX + 150 to cardX + 316 (width ≈ 166)

for ($i = 0; $i -lt $cards.Length; $i++) {
    $c = $cards[$i]
    $cardX = 18 + ($c.col * 334)
    $cardY = if ($c.row -eq 0) { 96 } else { 217 }
    $cardW = 320
    $cardH = 112
    
    # Crop the image portion (right half of card)
    $imgX = $cardX + 145
    $imgY = $cardY + 2
    $imgW = $cardW - 147
    $imgH = $cardH - 4
    
    $rect = New-Object System.Drawing.Rectangle($imgX, $imgY, $imgW, $imgH)
    $cropped = $src.Clone($rect, $src.PixelFormat)
    $cropped.Save("$outDir/$($c.name)-exact.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()

    # Also crop full card for reference
    $cardRect = New-Object System.Drawing.Rectangle($cardX, $cardY, $cardW, $cardH)
    $cardCropped = $src.Clone($cardRect, $src.PixelFormat)
    $cardCropped.Save("$outDir/$($c.name)-card.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $cardCropped.Dispose()
}

$src.Dispose()
Write-Host "Successfully cropped all 6 cards and exact images!"
