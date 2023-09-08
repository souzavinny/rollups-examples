#!/bin/bash

# Ensure the script is run with root privileges
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

# Update the package lists for upgrades and new package installations
sudo apt update

# Install required packages
sudo apt install -y build-essential cmake git unzip pkg-config
sudo apt install -y libjpeg-dev libpng-dev libtiff-dev
sudo apt install -y libavcodec-dev libavformat-dev libswscale-dev
sudo apt install -y libgtk2.0-dev libcanberra-gtk*
sudo apt install -y python3-dev python3-numpy python3-pip
sudo apt install -y libxvidcore-dev libx264-dev libgtk-3-dev
sudo apt install -y libtbb2 libtbb-dev libdc1394-22-dev
sudo apt install -y libv4l-dev v4l-utils
sudo apt install -y libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
sudo apt install -y libavresample-dev libvorbis-dev libxine2-dev
sudo apt install -y libfaac-dev libmp3lame-dev libtheora-dev
sudo apt install -y libopencore-amrnb-dev libopencore-amrwb-dev
sudo apt install -y libopenblas-dev libatlas-base-dev libblas-dev
sudo apt install -y liblapack-dev libeigen3-dev gfortran
sudo apt install -y libhdf5-dev protobuf-compiler
sudo apt install -y libprotobuf-dev libgoogle-glog-dev libgflags-dev

# Create a symlink to videodev.h
cd /usr/include/linux
sudo ln -s -f ../libv4l1-videodev.h videodev.h

echo "All packages installed and symlink created successfully!"

