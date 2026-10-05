Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Sharp {
  // Unsharp mask: out = src + amount*(src - blur3x3)
  public static Bitmap Apply(Bitmap src, double amount) {
    int w = src.Width, h = src.Height;
    Bitmap s = new Bitmap(w, h, PixelFormat.Format24bppRgb);
    using (Graphics g = Graphics.FromImage(s)) g.DrawImage(src, 0, 0, w, h);
    Rectangle r = new Rectangle(0, 0, w, h);
    BitmapData d = s.LockBits(r, ImageLockMode.ReadWrite, PixelFormat.Format24bppRgb);
    int stride = d.Stride; byte[] a = new byte[stride * h]; Marshal.Copy(d.Scan0, a, 0, a.Length);
    byte[] o = (byte[])a.Clone();
    for (int y = 2; y < h - 2; y++) for (int x = 2; x < w - 2; x++) for (int c = 0; c < 3; c++) {
      int sum = 0;
      for (int dy = -2; dy <= 2; dy++) for (int dx = -2; dx <= 2; dx++) sum += a[(y + dy) * stride + (x + dx) * 3 + c];
      double blur = sum / 25.0; int i = y * stride + x * 3 + c;
      double v = a[i] + amount * (a[i] - blur);
      o[i] = (byte)Math.Max(0, Math.Min(255, v));
    }
    Marshal.Copy(o, 0, d.Scan0, o.Length); s.UnlockBits(d); return s;
  }
}
"@
$dir = "c:\Users\LENOVO\Desktop\leniva cad solutions\public\images\pratham6-work"
foreach ($n in @("02-product-prototypes","03-industrial-tooling","04-automotive-applications")) {
  $src = [System.Drawing.Bitmap]::FromFile("$dir\$n-clean.png")
  $out = [Sharp]::Apply($src, 1.1)
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)
  $out.Save("$dir\$n-sharp.jpg", $enc, $p)
  $out.Dispose(); $src.Dispose()
  Write-Host "Sharpened $n"
}
