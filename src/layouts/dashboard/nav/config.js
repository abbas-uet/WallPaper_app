// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

/*
{
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
 */
const navConfig = [
  {
    title: 'Wallpapers',
    path: '/wallpapers/all',
    icon: icon('ic_blog'),
  },
  {
    title: 'Footballers',
    path: '/wallpapers/footballers',
    icon: icon('ic_blog'),
  },
  {
    title: 'Cricketers',
    path: '/wallpapers/cricketers',
    icon: icon('ic_blog'),
  },
  {
    title: 'Actors',
    path: '/wallpapers/actors',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
