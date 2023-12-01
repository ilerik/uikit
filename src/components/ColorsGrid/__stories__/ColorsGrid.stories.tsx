import React from 'react';

import type {StoryFn} from '@storybook/react';

import {ColorsGrid} from '../ColorsGrid';
import type {ColorsGridProps} from '../ColorsGrid';

export default {
    title: 'Components/Inputs/ColorsGrid',
    component: ColorsGrid,
};

const colors = [
    {value: 'color_1', color: null},
    {value: 'color_2', color: 'rgba(255, 255, 0, 0.45)'},
    {value: 'color_3', color: '#FFB9DD'},
    {value: 'color_4', color: '#FF91A1'},
    {value: 'color_5', color: '#8AD554'},
    {value: 'color_6', color: '#70C1AF'},
    {value: 'color_7', color: '#DAE0E7'},
    {value: 'color_8', color: '#FF7E00'},
    {value: 'color_9', color: '#ED65A9'},
    {value: 'color_10', color: '#BA74B3'},
    {value: 'color_11', color: '#E8B0A4'},
    {value: 'color_12', color: '#52A6C5'},
];

const DefaultTemplate: StoryFn<ColorsGridProps> = (args) => {
    const [value, onChange] = React.useState<string>();

    return <ColorsGrid {...args} value={value} onChange={onChange} />;
};

export const Default = DefaultTemplate.bind({});

Default.args = {
    colors: colors,
};

const SizeTemplate: StoryFn<ColorsGridProps> = (args) => (
    <React.Fragment>
        <ColorsGrid {...args} size="s" />
        <div style={{height: 20}} />
        <ColorsGrid {...args} size="m" />
        <div style={{height: 20}} />
        <ColorsGrid {...args} size="l" />
    </React.Fragment>
);

export const Size = SizeTemplate.bind({});

Size.args = {
    colors: colors,
};

const ShowcaseTemplate: StoryFn<ColorsGridProps> = (props) => {
    const [value, onChange] = React.useState<string>();

    return (
        <div>
            <div>
                <h3>Interactive</h3>
                <ColorsGrid {...props} value={value} onChange={onChange} />
            </div>
            &zwnj;
            <div>
                <div>
                    <h3>Not interactive</h3>
                    <ColorsGrid {...props} />
                </div>
            </div>
        </div>
    );
};

export const Showcase = ShowcaseTemplate.bind({});

Showcase.args = {
    colors: colors,
};
