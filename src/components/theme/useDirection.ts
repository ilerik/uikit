import type {ThemeContextProps} from './ThemeContext';
import {useThemeContext} from './useThemeContext';

export function useDirection(): ThemeContextProps['direction'] {
    return useThemeContext().direction;
}
