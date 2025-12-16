/// <reference types="@capacitor/cli" />

declare module '@capacitor/core' {
  interface PluginRegistry {
    App: import('@capacitor/app').AppPlugin;
    Haptics: import('@capacitor/haptics').HapticsPlugin;
    Keyboard: import('@capacitor/keyboard').KeyboardPlugin;
    StatusBar: import('@capacitor/status-bar').StatusBarPlugin;
  }
}

