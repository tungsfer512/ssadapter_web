import {unitName} from '@/services/base/constant';
import {DefaultFooter} from '@ant-design/pro-layout';
import {useIntl} from 'umi';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'CopyRight',
  });

  return (
    // <DefaultFooter
    //   copyright={`2023 ${defaultMessage} - ${APP_CONFIG_APP_VERSION}`}
    //   links={[
    //     {
    //       key: 'github',
    //       title: unitName.toUpperCase(),
    //       href: '#',
    //       blankTarget: true,
    //     },
    //   ]}
    //   style={{width: '100%'}}
    // />
      <></>
  );
};
