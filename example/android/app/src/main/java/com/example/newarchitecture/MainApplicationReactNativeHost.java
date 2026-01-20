package com.example.newarchitecture;

import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.PackageList;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactPackageTurboModuleManagerDelegate;
import com.example.BuildConfig;
import com.example.newarchitecture.modules.MainApplicationTurboModuleManagerDelegate;
import com.facebook.react.defaults.DefaultReactNativeHost;

import java.util.List;

public class MainApplicationReactNativeHost extends DefaultReactNativeHost {
  public MainApplicationReactNativeHost(Application application) {
    super(application);
  }

  @Override
  public boolean getUseDeveloperSupport() {
    return BuildConfig.DEBUG;
  }

  @Override
  protected List<ReactPackage> getPackages() {
    // Autolinking handles your library here automatically
    return new PackageList(this).getPackages();
  }

  @Override
  protected String getJSMainModuleName() {
    return "index";
  }

  @NonNull
  @Override
  protected ReactPackageTurboModuleManagerDelegate.Builder
  getReactPackageTurboModuleManagerDelegateBuilder() {
    // This is the modern way to link your TurboModules in 2026
    return new MainApplicationTurboModuleManagerDelegate.Builder();
  }

  @Override
  protected boolean isNewArchEnabled() {
    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
  }

}