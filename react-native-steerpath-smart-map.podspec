require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-steerpath-smart-map"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-steerpath-smart-map-sdk
                   DESC
  s.homepage     = "https://github.com/steerpath/react-native-steerpath-smart-map"
  s.license      = "MIT"
  s.authors      = { "Steerpath" => "support@steerpath.com" }
  s.platform     = :ios, "15.1"
  s.source       = { :git => "https://github.com/steerpath/react-native-steerpath-smart-map", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
	s.dependency 'SteerpathSmartSDK', '~> 2.0.0'

  if respond_to?(:install_modules_dependencies)
    install_modules_dependencies(s)
  end
end

