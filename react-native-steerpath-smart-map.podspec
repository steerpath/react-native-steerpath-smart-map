require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-steerpath-smart-map"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = package["description"]
  s.homepage     = "https://github.com/steerpath/react-native-steerpath-smart-map"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Steerpath" => "support@steerpath.com" }
  s.platforms    = { :ios => "15.1" } # Updated syntax
  s.source       = { :git => "https://github.com/steerpath/react-native-steerpath-smart-map.git", :tag => "#{s.version}" }
  
  s.requires_arc = true

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency 'SteerpathSmartSDK', '~> 2.0.0'

  if respond_to?(:install_modules_dependencies)
    install_modules_dependencies(s)
  end

end

