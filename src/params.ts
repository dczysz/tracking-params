export type ParamInfo = { key: string; value: string };

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
  /pd_rd\w+/,
  /pf_rd\w+/,
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
interface HandlerInfo {
  newCleanUrl: string;
  newParams: ParamInfo[];
}

interface DomainParams {
  domain: string;
  params: (string | RegExp)[];
  handler?: (url: URL) => HandlerInfo | void;
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
      'dchild',
      'ie',
      'linkCode',
      'linkId',
      'orig',
      'psc',
      'qid',
      'ref',
      'refRID',
      'sr',
      'tag',
    ],
    handler: url => {
      // Remove /ref=abc at end of url path
      const refPathMatch = /ref=\w+/;
      const newUrl = new URL(url.toString());

      const matches = newUrl.pathname.match(refPathMatch);
      if (!matches?.length) {
        return;
      }

      const startIndex = newUrl.pathname.indexOf(matches[0]);
      newUrl.pathname = newUrl.pathname.substring(0, startIndex);

      const newParams: ParamInfo[] = [
        {
          key: 'ref',
          value: url.pathname.substring(startIndex + 4), // After `ref=`
        },
      ];

      return {
        newCleanUrl: newUrl.toString(),
        newParams: newParams,
      };
    },
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
