import type {ThemeContextProps} from './ThemeContext';
import {useThemeContext} from './useThemeContext';

export function useTheme(): ThemeContextProps['theme'] {
    return useThemeContext().theme;
}
