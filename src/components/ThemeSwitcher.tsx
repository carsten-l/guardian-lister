import { WeatherSunny32Light, WeatherMoon32Light } from '@fluentui/react-icons';
import useThemeStore from "../stores/ThemeStore.js";

import { Button } from "@fluentui/react-components";


export default function ThemeSwitcher() {

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  return (
    <Button className={`rounded-full flex justify-center items-center ${theme === "light" ? "bg-neutral-300" : "bg-neutral-600"}`} size="large" onClick={toggleTheme} icon={theme === "light" ? <WeatherMoon32Light /> : <WeatherSunny32Light /> } />
  );
};

