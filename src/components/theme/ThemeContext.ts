import React from 'react';

import {DEFAULT_DIRECTION, DEFAULT_LIGHT_THEME, DEFAULT_THEME} from './constants';
import type {Direction, RealTheme, Theme} from './types';

export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
    direction: Direction;
    default: boolean;
}

const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    themeValue: DEFAULT_LIGHT_THEME,
    direction: DEFAULT_DIRECTION,
    default: true,
};

export const ThemeContext = React.createContext(initialValue);
ThemeContext.displayName = 'ThemeContext';
