param()
$git = 'C:\Program Files\Git\cmd\git.exe'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
& $git add .
& $git commit -m "Them logo va anh dai dien chia se Zalo chuan OpenGraph"
$token = (& $gh auth token).Trim()
& $git remote set-url origin "https://x-access-token:$($token)@github.com/ngocgiaukg/giaumanh.git"
& $git push origin main
& $git remote set-url origin "https://github.com/ngocgiaukg/giaumanh.git"
Write-Host "ZALO_OG_PUSHED_SUCCESSFULLY"
