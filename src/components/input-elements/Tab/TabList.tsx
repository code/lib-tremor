import React, { useEffect, useState } from 'react';

import { BaseColors, classNames, defaultColors, getColorVariantsFromColorThemeValue, spacing } from 'lib';
import { Color, MarginTop } from '../../../lib';

export interface TabListProps {
    defaultValue?: any,
    color?: Color,
    handleSelect?: { (value: any): void },
    marginTop?: MarginTop,
    children: React.ReactElement[]
}

const TabList = ({
    defaultValue,
    color = BaseColors.Blue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    marginTop = 'mt-0',
    children,
}: TabListProps) => {
    const [selectedTab, setSelectedTab] = useState<any|null>(defaultValue);

    useEffect(() => {
        handleSelect(selectedTab);
    }, [selectedTab]);

    return(
        <ol aria-label="Tabs" className={ classNames(
            'flex justify-start overflow-x-clip border-b',
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
            marginTop,
            spacing.twoXl.spaceX,
        ) }>
            { React.Children.map(children, (child) => (
                React.cloneElement(child, {
                    privateProps: {
                        setSelectedTab: setSelectedTab,
                        color: color,
                        isActive: selectedTab === child.props.value,
                    }
                })
            )) }
        </ol>
    );
};

export default TabList;