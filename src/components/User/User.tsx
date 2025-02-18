import React from 'react';

import {UserAvatar} from '../UserAvatar';
import type {UserAvatarSize} from '../UserAvatar';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './User.scss';

const b = block('user');

export interface UserProps extends QAProps {
    name?: string;
    description?: string;
    imgUrl?: string;
    size?: UserAvatarSize;
    className?: string;
}

export function User({name, description, imgUrl, size = 'm', className, qa}: UserProps) {
    const compact = size === 'xs';

    return (
        <div className={b({size}, className)} data-qa={qa}>
            {imgUrl && <UserAvatar imgUrl={imgUrl} size={size} className={b('avatar')} />}
            {(name || description) && (
                <div className={b('info')}>
                    {name && <span className={b('name')}>{name}</span>}
                    {!compact && description && (
                        <span className={b('description')}>{description}</span>
                    )}
                </div>
            )}
        </div>
    );
}
