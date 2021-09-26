import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = '大软实验第四小组';

  const currentDate = new Date().toLocaleDateString();

  return (
    <DefaultFooter
      copyright={`${defaultMessage} ${currentDate}`}
      links={[
        {
          key: 'WuHan University',
          title: '武汉大学',
          href: 'https://www.whu.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Diligentspring/Luojia-Activity-Platform',
          blankTarget: true,
        },
        {
          key: 'HongYi Honor School',
          title: '弘毅学堂',
          href: 'http://hyxt.whu.edu.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
