import React from 'react';
import styled, { css } from 'styled-components';
import { Popconfirm } from 'antd';

export const CustomConfirm = ({
    condition,
    title,
    okText,
    cancelText,
    onConfirm,
    onCancel,
    children
}) => {
    return condition ? (
        <Popconfirm
            title={title || ''}
            okText={okText}
            cancelText={cancelText}
            onConfirm={onConfirm || null}
            onCancel={onCancel || null}
        >
            {children}
        </Popconfirm>
    ) : (
        <>{children}</>
    );
};
