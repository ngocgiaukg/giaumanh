@echo off
chcp 65001 > nul
title Đẩy mã nguồn lên GitHub - giaumanh.com
echo ================================================================
echo    ĐANG TẢI MÃ NGUỒN LÊN GITHUB: https://github.com/ngocgiaukg/giaumanh.git
echo ================================================================
echo.
echo [*] Đang thực hiện đẩy code...
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [THÀNH CÔNG] Đã tải toàn bộ mã nguồn lên GitHub thành công!
    echo 👉 Bạn có thể vào xem tại: https://github.com/ngocgiaukg/giaumanh
) else (
    echo [LƯU Ý] Nếu thông báo 'Repository not found', bạn hãy chắc chắn rằng
    echo đã tạo kho lưu trữ tên 'giaumanh' trên https://github.com/new trước nhé.
)
echo.
pause
