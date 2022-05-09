import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import logo from '@/';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '后台管理系统',
  pwa: false,
  logo: 'https://dev-mng.qlion.com/static/img/logo.0eb67960.png',
  iconfontUrl: '',
};

export default Settings;
