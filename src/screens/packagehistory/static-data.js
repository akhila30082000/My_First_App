export const PackageList = [
  {
    moduleName: 'Available Packages',
    moduleId: 'Available Packages',
    moduleIcon: 'static/available.png',
  },
  {
    moduleName: 'Purchased Packages',
    moduleId: 'Purchased Packages',
    moduleIcon: 'static/purchased.png',
  },
  // {
  //   moduleName: 'Manage Packages',
  //   moduleId: 'Manage Packages',
  //   moduleIcon: 'static/purchased.png',
  // },
];
export const parnterPackageList = [
  {
    moduleName: 'Subscribed Packages',
    moduleId: 'Purchased Packages',
    moduleIcon: 'static/purchased.png',
  },
];
export const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: '', sort: false },
  {
    id: 'module',
    numeric: false,
    disablePadding: true,
    label: 'Module',
    sort: true,
  },
  {
    id: 'service',
    numeric: true,
    disablePadding: false,
    label: 'Service',
    sort: true,
  },
  {
    id: 'version',
    numeric: true,
    disablePadding: false,
    label: 'Version',
    sort: true,
  },
  {
    id: 'requestCount',
    numeric: true,
    disablePadding: false,
    label: 'RequestCount',
    sort: true,
  },
  {
    id: 'requestsUtilized',
    numeric: true,
    disablePadding: false,
    label: 'RequestsUtilized',
    sort: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
  // { id: 'api', numeric: true, disablePadding: false, label: 'API', sort: true },
  // {
  //   id: 'httpType',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'HTTPMethod',
  //   sort: true,
  // },
];
