import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import useLocale from '#wf-local/locales/useLocale';
import { useSettings } from '#wf-local/store/settingStore';

import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

import { ThemeMode } from '#wf-types/enum';

interface Props {
  children: React.ReactNode;
}
export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings();

  const { language } = useLocale();

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken[themeMode].token },
        components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
