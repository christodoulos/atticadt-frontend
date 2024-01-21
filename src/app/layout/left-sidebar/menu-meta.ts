import { MenuItem } from './menu.model';

// menu items
export const MENU: MenuItem[] = [
  { key: 'about', label: 'About', link: '/about', icon: 'uil-home-alt' },
  {
    key: 'legal',
    label: 'Legal',
    isTitle: false,
    collapsed: true,
    icon: 'ri-file-text-line',
    children: [
      {
        key: 'privacy_policy',
        label: 'Privacy Policy',
        link: '/legal/privacy-policy',
      },
      {
        key: 'terms_of_service',
        label: 'Terms of Service',
        link: '/legal/terms-of-service',
      },
    ],
  },
  // Innovations Inventory
  {
    key: 'innovations_inventory',
    label: 'Innovations Inventory',
    isTitle: true,
  },
  {
    key: 'athens_plant_nursery',
    label: 'Sewer Mining Technology',
    link: 'innovations/athens-plant-nursery',
    icon: 'ri-plant-line',
  },
  {
    key: 'farmair',
    label: 'Plant Stress Detection',
    link: 'innovations/farmair',
    icon: 'ri-leaf-line',
  },
  {
    key: 'subsol',
    label: 'Subsurface Water Solutions',
    link: 'innovations/subsol',
    icon: 'ri-water-flash-line',
  },
  // Regional Services
  { key: 'regional_services', label: 'Regional Services', isTitle: true },
  {
    key: 'meteorological_heatmaps',
    label: 'Meteorological Heatmaps',
    link: '/regional/meteorological-heatmaps',
    icon: 'uil-layer-group',
  },
  // Analysis Services
  { key: 'analysis_services', label: 'Analysis Services', isTitle: true },
  {
    key: 'hellinikon',
    label: 'Flood Risk Analysis',
    link: '/analyses/hellinikon',
    icon: 'ri-flood-line',
  },
  // European Services
  { key: 'european_services', label: 'Experiments', isTitle: true },
  {
    key: 'nuts_explorer',
    label: 'NUTS Explorer',
    link: '/european-services/nuts-explorer',
    icon: 'ri-earth-line',
  },
  {
    key: 'eurostat_explorer',
    label: 'Eurostat Explorer',
    link: '/european-services/eurostat-explorer',
    icon: 'ri-database-2-line',
  },
];
