import React, { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import i18next, { languagesOptions } from '@/i18n';
 
const items: MenuProps['items'] = languagesOptions.map((item) => {
    return {
        key: item.value,
        label: (
            <span>
              
                {item.label}
            </span>
        ),
    };
});

const App: React.FC = () => {
    // 获取语言
    const [language, setLanguage] = useState(i18next.language);

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setLanguage(lng);
        };

        i18next.on('languageChanged', handleLanguageChange);

        // Clean up the event listener on component unmount
        return () => {
            i18next.off('languageChanged', handleLanguageChange);
        };
    }, []);

    
    return (
        <Dropdown
            menu={{
                items,
                onClick: (item) => {
                    const { key } = item;
                    i18next.changeLanguage(key);
                },
            }}>
            <span style={{ cursor: 'pointer' }}>
                <Space style={{ marginRight: 8 }}>{language}</Space>
                <Space>语言切换</Space>
            </span>
        </Dropdown>
    );
};

export default App;
