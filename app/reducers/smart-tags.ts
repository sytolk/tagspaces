export default i18n => [
  {
    title: i18n.t('core:smartTags'),
    uuid: 'd4b5c16a-1c3a-4561-96c7-686696cb2004',
    description: '',
    color: '#4986e7',
    textcolor: '#ffffff',
    readOnly: true,
    children: [
      {
        id: '05fbebfd-576c-4402-bd1b-e9900acd6661',
        type: 'plain',
        title: i18n.t('core:smartTagNow'),
        functionality: 'now',
        description: i18n.t('core:smartTagNowDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: '7505080c-b974-425f-8434-25cd08fb1013',
        type: 'plain',
        title: i18n.t('core:smartTagToday'),
        functionality: 'today',
        description: i18n.t('core:smartTagTodayDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: '841e55a0-3596-4417-9186-d035cbcb676c',
        type: 'plain',
        title: i18n.t('core:smartTagTomorrow'),
        functionality: 'tomorrow',
        description: i18n.t('core:smartTagTomorrowDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: '3bf2bde9-cfa1-41cc-9154-debbf853e74c',
        type: 'plain',
        title: i18n.t('core:smartTagYesterday'),
        functionality: 'yesterday',
        description: i18n.t('core:smartTagYesterdayDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: 'e4618609-0940-4d78-b79f-7d4221df33e2',
        type: 'plain',
        title: i18n.t('core:smartTagMonth'),
        functionality: 'currentMonth',
        description: i18n.t('core:smartTagMonthDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: 'b6d6c107-741e-423b-82a4-f00ae394dee4',
        type: 'plain',
        title: i18n.t('core:smartTagYear'),
        functionality: 'currentYear',
        description: i18n.t('core:smartTagYearDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: 'da9fd0e6-7921-4195-b8f9-dca80f132bab',
        type: 'plain',
        title: i18n.t('core:smartTagGeo'),
        functionality: 'geoTagging',
        description: i18n.t('core:smartTagGeoDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      },
      {
        id: '67678ddd-4979-4489-8d2d-69a964af6b0d',
        type: 'plain',
        title: i18n.t('core:smartTagDate'),
        functionality: 'dateTagging',
        description: i18n.t('core:smartTagDateDescription'),
        color: '#4986e7',
        textcolor: '#ffffff'
      }
    ]
  }
];
