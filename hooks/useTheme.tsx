import { DarkTheme, LightTheme } from "../constants/constant";
import { useThemeStore } from "../store/useThemeStore";

export const  useTheme =() =>{
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? DarkTheme : LightTheme;

  return { theme, isDark };
}
export default useTheme;