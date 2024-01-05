export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },
    ///////////////////////////////////
    // DANH MUC HE THONG
    {
        name: 'DanhMuc',
        path: '/danh-muc',
        icon: 'copy',
        hideInMenu: true,
        routes: [
            {
                name: 'ChucVu',
                path: 'chuc-vu',
                component: './DanhMuc/ChucVu',
            },
        ],
    },
    {
        name: 'Clients',
        path: '/clients',
        icon: 'InsertRowAboveOutlined',
        component: './clients'
    },
    {
        name: 'Keys and certificates',
        path: '/keys-and-certificates',
        icon: 'KeyOutlined',
        component: './KeysAndCertificates',
        routes: [
          {
            path: '/',
            redirect: './api-key',
          }
        ]
    },
    // {
    //     name: 'Diagnostics',
    //     path: '/Diagnostics',
    //     icon: 'RadiusSettingOutlined',
    //     component: './Diagnostics'
    // },
    {
        name: 'Settings',
        path: '/Settings',
        icon: 'SettingOutlined',
        component: './Settings'
    },
    {
        name: 'Certificate',
        path: '/certificate/:id',
        component: './Certificate',
        hideInMenu: true,
    },
    {
        path: '/clients/:id/service-clients/:serviceId',
        component: './detailClient/serviceClients/detailServiceClients',
        hideInMenu: true
    },
    {
        path: '/clients/:id',
        component: './detailClient',
        hideInMenu: true,
        routes: [],
    },
    {
        name: 'addClient',
        path: '/add-client',
        component: './addClient',
        hideInMenu: true,
    },
    {
        name: 'addMember',
        path: '/add-member',
        component: './addMember',
        hideInMenu: true,
    },
    {
        path: '/notification',
        routes: [
            {
                path: './subscribe',
                exact: true,
                component: './ThongBao/Subscribe',
            },
            {
                path: './check',
                exact: true,
                component: './ThongBao/Check',
            },
            {
                path: './',
                exact: true,
                component: './ThongBao/NotifOneSignal',
            },
        ],
        layout: false,
        hideInMenu: true,
    },
    {
        path: '/',
        redirect: './clients',
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        component: './exception/404',
    },
];
