import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Flex} from '../layout';

import {Alert} from './Alert';
import type {AlertTheme} from './types';

const title = 'Where will you go, hero?';
const message = 'Choose wisely: the end of the fairy tale depends on your decision';
const right = 'To the right (lose the horse)';
const center = 'Straight (find a wife)';
const left = 'To the left (CC 235.2)';

describe('Alert', () => {
    test('render close button if callback passed', async () => {
        const callback = jest.fn();

        render(<Alert title={title} message={message} onClose={callback} />);

        const buttons = await screen.findAllByRole('button');

        expect(buttons.length).toEqual(1);

        await userEvent.click(buttons[0]);

        expect(callback).toBeCalledTimes(1);
    });

    test('render actions as buttons if decl passed', async () => {
        render(
            <Alert
                title={title}
                message={message}
                actions={[
                    {
                        text: right,
                    },
                    {
                        text: center,
                    },
                    {
                        text: left,
                    },
                ]}
            />,
        );

        expect((await screen.findAllByRole('button')).length).toEqual(3);
    });

    test('render actions as is if component passed', async () => {
        render(<Alert title={title} message={message} actions={<Flex>{center}</Flex>} />);

        expect(await screen.findByText(center)).toBeInTheDocument();
    });

    test('has predicted styles if inline layout rendered', async () => {
        const {container} = render(
            <Alert
                theme="danger"
                align="center"
                title={title}
                layout="horizontal"
                onClose={jest.fn()}
                actions={[{text: right}]}
            />,
        );

        expect(container).toMatchSnapshot();
    });

    test.each<AlertTheme>(['danger', 'info', 'positive', 'success', 'warning', 'utility'])(
        'render correct icon if not normal theme',
        async (theme) => {
            const {container} = render(
                <Alert theme={theme} title={title} message={message} onClose={jest.fn()} />,
            );

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const icon = await container.querySelector('.yc-alert__icon');

            expect(icon).toBeInTheDocument();
        },
    );

    test("by default don't render icon component", async () => {
        const {container} = render(<Alert title={title} message={message} onClose={jest.fn()} />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const icon = await container.querySelector('.yc-alert__icon');

        expect(icon).not.toBeInTheDocument();
    });

    test('can render custom icon component if needed', async () => {
        const customIconText = "i'ma icon";
        render(<Alert title={title} message={message} icon={<div>{customIconText}</div>} />);

        expect(await screen.findByText(customIconText)).toBeInTheDocument();
    });
});
