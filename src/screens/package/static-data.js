export const customPlan = [
  {
    packageName: 'Custom',
    packageCost: 'cost',
    description: 'Choose your own APIs and API calls to build your own package',
    button: 'Order',
    packageType: '',
    isAdmin: true,
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
  { id: 'api', numeric: true, disablePadding: false, label: 'API', sort: true },
  {
    id: 'httpType',
    numeric: true,
    disablePadding: false,
    label: 'HTTP Method',
    sort: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Api Status',
    sort: true,
  },
];

export const modules = [
  { name: 'Payment', image: '/static/payments.png' },
  { name: 'Subscription', image: '/static/subscriptions.png' },
  { name: 'Account', image: '/static/account.png' },
  { name: 'Ticketing', image: '/static/ticketing.png' },
  { name: 'Payment', image: '/static/payments.png' },
  { name: 'Subscription', image: '/static/subscriptions.png' },
  { name: 'Account', image: '/static/account.png' },
  { name: 'Ticketing', image: '/static/ticketing.png' },
];
export const headCellsCustomplan = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Api Id',
  },
  {
    id: 'apiName',
    numeric: true,
    disablePadding: false,
    label: 'Api Name',
  },
  {
    id: 'Url',
    numeric: true,
    disablePadding: false,
    label: 'Url',
  },
  { id: 'http', numeric: true, disablePadding: false, label: 'Http Method' },
];

export const columnSpan = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Api Calls',
  },
  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost',
  },
];
export const requestCount = [
  {
    id: 1,
    partnerId: 'GSB-IND',
    requestRange: '1000-5000',
    cost: '1000',
    extraPerReq: '1',
    status: 'active',
    moduel: {
      moduleId: 1,
      moduleName: 'payments',
      status: 'active',
    },
  },
  {
    id: 2,
    partnerId: 'GSB-IND',
    requestRange: '5000-15000',
    cost: '2000',
    extraPerReq: '1',
    status: 'active',
    moduel: {
      moduleId: 1,
      moduleName: 'payments',
      status: 'active',
    },
  },
];
