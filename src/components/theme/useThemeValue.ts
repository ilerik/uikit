import type {ThemeContextProps} from './ThemeContext';
import {useThemeContext} from './useThemeContext';

export function useThemeValue(): ThemeContextProps['themeValue'] {
    return useThemeContext().themeValue;
}
