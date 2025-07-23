import React ,{ useState}  from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import i18next, { languagesOptions } from '@/i18n';
import i18n from 'i18next';
const items: MenuProps['items'] = languagesOptions.map((item) => {
    return {
        key: item.value,
        label: (
            <span>
                <SmileOutlined style={{ marginRight: 8 }} />
                {item.label}
            </span>
        ),
    };
});

const App: React.FC = () => {
    const [language, setLanguage] = useState(i18next.language);

    console.log('language==',language)

    return (
        <Dropdown
            menu={{
                items,

                onClick: (item) => {
                    const { key } = item;
                    i18n.changeLanguage(key);
                },
            }}>
            <>
                <span>zhs</span>

                <Space>语言切换</Space>
            </>
        </Dropdown>
    );
};

export default App;
