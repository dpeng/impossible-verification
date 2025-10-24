#!/bin/bash

# Impossible Verification iOS App Setup Script
# This script initializes a React Native iOS project

echo "🚀 Setting up Impossible Verification iOS App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📱 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "iOS development requires macOS. Current OS: $OSTYPE"
    exit 1
fi

print_success "macOS detected - iOS development is possible!"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is required but not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js found: $NODE_VERSION"

# Check if React Native CLI is installed
if ! command -v react-native &> /dev/null; then
    print_warning "React Native CLI not found. Installing..."
    npm install -g @react-native-community/cli
    print_success "React Native CLI installed!"
else
    RN_VERSION=$(react-native --version)
    print_success "React Native CLI found: $RN_VERSION"
fi

# Check if CocoaPods is installed
if ! command -v pod &> /dev/null; then
    print_warning "CocoaPods not found. Installing..."
    sudo gem install cocoapods
    print_success "CocoaPods installed!"
else
    POD_VERSION=$(pod --version)
    print_success "CocoaPods found: $POD_VERSION"
fi

# Check if Xcode is installed
if ! command -v xcodebuild &> /dev/null; then
    print_error "Xcode is required but not found."
    echo "Please install Xcode from the Mac App Store"
    exit 1
fi

XCODE_VERSION=$(xcodebuild -version | head -n1)
print_success "Xcode found: $XCODE_VERSION"

print_step "Installing npm dependencies..."
npm install

print_step "Initializing React Native iOS project..."
if [ ! -d "ios" ]; then
    npx react-native init ImpossibleVerificationApp --template react-native-template-typescript --skip-install
    
    # Move generated files to current directory
    mv ImpossibleVerificationApp/* .
    mv ImpossibleVerificationApp/.* . 2>/dev/null || true
    rmdir ImpossibleVerificationApp
    
    print_success "React Native project initialized!"
else
    print_warning "iOS project already exists, skipping initialization."
fi

print_step "Installing iOS dependencies..."
cd ios && pod install && cd ..

print_success "🎉 Setup complete!"
echo ""
echo -e "${BLUE}📱 To run the app:${NC}"
echo "   npx react-native run-ios"
echo ""
echo -e "${BLUE}📱 To run on a specific simulator:${NC}"
echo "   npx react-native run-ios --simulator=\"iPhone 15 Pro\""
echo ""
echo -e "${BLUE}📱 To run on a physical device:${NC}"
echo "   npx react-native run-ios --device"
echo ""
echo -e "${YELLOW}⚠️  Remember: This app is designed to always fail verification!${NC}"
echo -e "${GREEN}🎭 Enjoy the impossible verification experience!${NC}"