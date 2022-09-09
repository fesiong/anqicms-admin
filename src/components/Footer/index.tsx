import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = 'anqicms.com';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'anqicms.com/manual',
          title: '模板使用教程',
          href: 'https://www.anqicms.com/manual',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
