param()
$git = 'C:\Program Files\Git\cmd\git.exe'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
& $git add .
& $git commit -m "Toi uu popup thanh toan MoMo va nut sao chep mot cham"
$token = (& $gh auth token).Trim()
& $git remote set-url origin "https://x-access-token:$($token)@github.com/ngocgiaukg/giaumanh.git"
& $git push origin main
& $git remote set-url origin "https://github.com/ngocgiaukg/giaumanh.git"
Write-Host "UPDATE_PUSHED_SUCCESSFULLY"
