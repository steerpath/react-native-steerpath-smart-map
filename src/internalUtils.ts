import { PixelRatio } from "react-native";
export function convertNativePixelToDp(input: number) {
  const ratio = PixelRatio.get();
  return input / ratio;
}
