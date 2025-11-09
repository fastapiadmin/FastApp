#!/bin/bash
# 构建后同步脚本：将 h5 目录内容同步到 app 目录

BUILD_DIR="/home/ubuntu/FastApp/dist/build"
H5_DIR="$BUILD_DIR/h5"
APP_DIR="$BUILD_DIR/app"

if [ -d "$H5_DIR" ]; then
    echo "正在同步构建文件..."
    sudo rm -rf "$APP_DIR"
    sudo cp -r "$H5_DIR" "$APP_DIR"
    sudo chmod -R 755 "$APP_DIR"
    echo "同步完成！"
else
    echo "错误: $H5_DIR 目录不存在"
    exit 1
fi

