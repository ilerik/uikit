import React from 'react';

import {Check} from '@gravity-ui/icons';
import isString from 'lodash/isString';

import {useActionHandlers} from '../../hooks/useActionHandlers';
import {Icon} from '../Icon';
import {useTheme} from '../theme';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import {getContrastColor} from './utils';

import './ColorsGrid.scss';

const b = block('colors-grid');

export type ColorsGridSize = 's' | 'm' | 'l';

export interface Color {
    value: string;
    color: string | null;
}

export interface ColorsGridProps extends DOMProps, QAProps {
    colors: Color[];
    value?: string;
    rowSize?: number;
    size?: ColorsGridSize;
    onChange?(value: string): void;
}

export function ColorsGrid(props: ColorsGridProps) {
    const {colors, rowSize = 6, size = 'm', value, onChange, style, className, qa} = props;
    const theme = useTheme();
    const isClickable = Boolean(onChange);

    const onClick = (event: React.UIEvent<HTMLElement>) => {
        const newValue = event.currentTarget.dataset.value;

        if (isString(newValue) && onChange) {
            event.preventDefault();
            onChange(newValue);
        }
    };

    const {onKeyDown} = useActionHandlers(onClick);

    return (
        <div
            data-qa={qa}
            className={b({size}, className)}
            style={{...style, '--cols-num': rowSize} as React.CSSProperties}
        >
            {colors.map((item, index) => {
                const isVoid = !item.color;
                const isSelected = value === item.value;
                const style = {
                    backgroundColor: item.color || undefined,
                    color: isSelected ? getContrastColor(item.color, theme) : undefined,
                };

                return (
                    <div
                        key={index}
                        data-value={item.value}
                        role={isClickable ? 'button' : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                        style={style}
                        className={b('item', {void: isVoid, active: isSelected})}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                    >
                        {!isVoid && isSelected && (
                            <Icon className={b('check')} size={40} data={Check} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
