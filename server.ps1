$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $localPath = Join-Path "d:\jds" $path.TrimStart('/')
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($localPath.EndsWith(".jpg")) { $response.ContentType = "image/jpeg" }
            elseif ($localPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($localPath.EndsWith(".jsx")) { $response.ContentType = "text/plain" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        Write-Host "Request handling error: $_"
    }
}
