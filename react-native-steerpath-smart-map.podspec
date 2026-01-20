require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-steerpath-smart-map"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = package["description"] # Use package.json description directly
  s.homepage     = "https://github.com/steerpath/react-native-steerpath-smart-map"
  s.license      = "MIT"
  s.authors      = { "Steerpath" => "support@steerpath.com" }
  s.platforms    = { :ios => "15.1" } # Updated syntax
  s.source       = { :git => "https://github.com/steerpath/react-native-steerpath-smart-map.git", :tag => "#{s.version}" }

  # Recursive glob (**) to ensure all nested JNI/Fabric files are included
  s.source_files = "ios/**/*.{h,m,mm,swift}", "cpp/**/*.{h,cpp}"
  s.requires_arc = true

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/cpp\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-Core"
  s.dependency 'SteerpathSmartSDK', '~> 2.0.0'

  # Core New Architecture Dependencies (Mandatory in 2026)
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"

  # This macro ensures CocoaPods runs the modern installation logic
  if respond_to?(:install_modules_dependencies)
    install_modules_dependencies(s)
  end
end