import { useContext } from "react";
import { ThemeContext } from "../contexts/themecontext.jsx";
import "./theme-switcher.css";

import { type IIconProps, initializeIcons } from '@fluentui/react';
import { TooltipHost, type ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';  


export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

initializeIcons();

const sunIcon: IIconProps = { iconName: 'Sunny' };
const moonIcon: IIconProps = { iconName: 'ClearNight' };

const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };


export default function ThemeSwitcher(props: IButtonExampleProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const tooltipId = useId('tooltip');
  const { disabled, checked } = props;

  const handleClick = () => {
    toggleTheme();
  }

  return (
    <>
    
    <TooltipHost
        // This id is used on the tooltip itself, not the host
        // (so an element with this id only exists when the tooltip is shown)
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
        <IconButton iconProps={theme === "dark" ? moonIcon : sunIcon} aria-label="hoblifnof" disabled={disabled} checked={checked} onClick={handleClick} />
      </TooltipHost>
    
    

    <button
      id="theme-switch"
      onClick={toggleTheme}
      title="Toggle theme"
      aria-pressed={theme === "dark"}
      className={`theme-switch ${theme === "dark" ? "dark" : "light"}`}
    >
      <svg
        className="svg_black"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
      >
        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
      </svg>
      <svg
        className="svg_white"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
      >
        <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
      </svg>

      {/* <label className="toggle-switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="toggle-switch-input"
        />
        <span
          className={`toggle-switch-slider${theme === "dark" ? " dark" : ""}`}
        >
          <span className="toggle-switch-knob" />
        </span>
      </label> */}
    </button>

    </>
  );
};

