import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Color, ColorsGrid, ColorsGridSize} from '../ColorsGrid';

const qaId = 'colors-grid-component';

const colors: Color[] = [{color: '#ff0000', value: 'test'}];
const sizes: ColorsGridSize[] = ['s', 'm', 'l'];

describe('ColorsGrid', () => {
    test('render by default', () => {
        render(<ColorsGrid qa={qaId} colors={colors} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toBeVisible();
    });

    test.each(sizes)('render with given "%s" size', (size) => {
        render(<ColorsGrid qa={qaId} colors={colors} size={size} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toHaveClass(`yc-colors-grid_size_${size}`);
    });

    test('render with empty colors list', () => {
        render(<ColorsGrid qa={qaId} colors={[]} />);
        const grid = screen.getByTestId(qaId);

        expect(grid).toBeEmptyDOMElement();
    });

    test('render colors list', () => {
        render(<ColorsGrid qa={qaId} colors={colors} />);
        const {children} = screen.getByTestId(qaId);

        expect(children.length).toBe(colors.length);
    });

    test('render with null color', async () => {
        render(<ColorsGrid qa={qaId} colors={[{color: null, value: 'test'}]} />);
        const {firstChild} = screen.getByTestId(qaId);

        expect(firstChild).toHaveClass('yc-colors-grid__item_void');
    });

    test('render with active color', () => {
        const color = colors[0];

        render(<ColorsGrid qa={qaId} colors={colors} value={color.value} />);
        const {firstChild} = screen.getByTestId(qaId);

        expect(firstChild).toHaveClass('yc-colors-grid__item_active');
    });

    test('call onChange when color changed', async () => {
        const color = colors[0];
        const onChangeFn = jest.fn();
        const user = userEvent.setup();

        render(<ColorsGrid qa={qaId} colors={colors} onChange={onChangeFn} />);

        await user.click(screen.getByRole('button'));

        expect(onChangeFn).toBeCalledWith(color.value);
    });
});
