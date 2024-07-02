param (
    [string]$outputPath
)

Add-Type -AssemblyName System.Drawing

$deviceManager = New-Object -ComObject WIA.DeviceManager
$device = $deviceManager.DeviceInfos | Where-Object { $_.Type -eq 1 } | Select-Object -First 1

if ($null -ne $device) {
    $device = $device.Connect()
    $scannerItem = $device.Items | Select-Object -First 1
    $imageFile = New-Object -ComObject WIA.ImageFile

    $imageFile = $scannerItem.Transfer("{B96B3CAF-0728-11D3-9D7B-0000F81EF32E}")

    # Default path if not provided
    if (-not $outputPath) {
        $outputPath = "C:\Users\araou\Github-Repos\playground\image.png"
    }

    $imageFile.SaveFile($outputPath)
    Write-Output "Scan complete. Image saved to $outputPath"
} else {
    Write-Output "No scanner found"
}
