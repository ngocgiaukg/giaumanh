@echo off
chcp 65001 > nul
title Hải Sản Giàu Mạnh - giaumanh.com
echo ================================================================
echo    CHƯƠNG TRÌNH KHỞI ĐỘNG HỆ THỐNG HẢI SẢN GIÀU MẠNH
echo    Website: giaumanh.com
echo    Phục vụ: Phường Rạch Giá, Tỉnh An Giang
echo ================================================================
echo.
echo [*] Đang kiểm tra và khởi động máy chủ HTTP trên cổng 8080...
start /b powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
timeout /t 2 > nul
echo [*] Đang mở website trên trình duyệt...
start http://localhost:8080/
echo.
echo [OK] Website đang hoạt động tại địa chỉ: http://localhost:8080/
echo Nhấn phím bất kỳ để đóng cửa sổ này (máy chủ vẫn chạy nền).
echo.
pause
