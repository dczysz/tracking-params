const UNIVERSAL_PARAMS: (string | RegExp)[] = [
  '__twitter_impression',
  '_hsenc',
  '_openstat',
  'action_object_map',
  'action_ref_map',
  'action_type_map',
  'adgroupid',
  'amp',
  'campaignid',
  'CNDID',
  'fb_action_ids',
  'fb_action_types',
  'fb_ref',
  'fb_source',
  'fbclid',
  'feeditemid',
  'ga_campaign',
  'ga_content',
  'ga_medium',
  'ga_place',
  'ga_source',
  'ga_term',
  'gclid',
  'gs_l',
  'hmb_campaign',
  'hmb_medium',
  'hmb_source',
  'mbid',
  'mc_cid',
  'mc_eid',
  'mkt_tok',
  'referrer',
  'spJobID',
  'spMailingID',
  'spReportId',
  'spUserID',
  /utm_\w+/,
  'wt_mc_o',
  'WT.mc_ev',
  'WT.mc_id',
  'WT.srch',
  'yclid',
];

// Domain specific block list
interface DomainParams {
  domain: string;
  params: (string | RegExp)[];
}

export const DOMAIN_PARAMS: DomainParams[] = [
  {
    domain: '.',
    params: UNIVERSAL_PARAMS,
  },
  {
    domain: 'amazon',
    params: [
      '_encoding',
      'creative',
      'creativeASIN',
      'ie',
      'linkCode',
      'linkId',
      /pd_rd\w+/,
      /pf_rd\w+/,
      'psc',
      'tag',
    ],
  },
  {
    domain: 'bing',
    params: ['cvid', 'form', 'pq', 'qs', 'sc', 'sk', 'sp'],
  },
  {
    domain: 'google',
    params: ['ei', 'gws_rd', 'sei', 'ved'],
  },
  {
    domain: 'instagram',
    params: ['igshid'],
  },
  {
    domain: 'nytimes',
    params: ['emc', 'partner'],
  },
  {
    domain: 'reddit',
    params: ['context', 'ref', 'ref_source', 'st'],
  },
  {
    domain: 'twitter',
    params: ['vertical', 'src', 's', 'ref_src', 'ref_url'],
  },
  {
    domain: 'youtube',
    params: ['ab_channel', 'attr_tag', 'feature', 'kw'],
  },
];
