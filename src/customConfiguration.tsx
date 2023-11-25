export interface customConfiguration {
  uuid: number;
  name: string;
  fdp: number;
  url: string;
  warning: string;
  nameSelector: string;
  imgSelector: string;
  imgPreUrl: string;
  priceSelector: string;
  priceReplacers: Replacer[];
  partnerUrl: string;
}

interface Replacer {
  replaced: string;
  replaceBy: string;
}

export interface GlobalConfiguration {
  [key: number]: customConfiguration;
}

const initialConfiguration: GlobalConfiguration = {
  1: {
    fdp: 0,
    name: 'Amazon FR',
    nameSelector: '#productTitle',
    imgPreUrl: '',
    imgSelector: '#imgTagWrapperId img',
    priceSelector: '#corePrice_feature_div .a-price-whole',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    url: 'amazon.fr',
    uuid: 1,
    warning: '',
    partnerUrl: '',
  },
  2: {
    fdp: 0,
    name: 'Amazon DE',
    nameSelector: '#productTitle',
    imgPreUrl: '',
    imgSelector: '#imgTagWrapperId img',
    priceSelector: '#corePrice_feature_div .a-price-whole',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    url: 'amazon.de',
    uuid: 2,
    warning: '',
    partnerUrl: '',
  },
  3: {
    fdp: 0,
    name: 'Amazon ES',
    nameSelector: '#productTitle',
    imgPreUrl: '',
    imgSelector: '#imgTagWrapperId img',
    priceSelector: '#corePrice_feature_div .a-price-whole',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    url: 'amazon.es',
    uuid: 3,
    warning: '',
    partnerUrl: '',
  },
  4: {
    fdp: 0,
    name: 'Amazon IT',
    nameSelector: '#productTitle',
    imgPreUrl: '',
    imgSelector: '#imgTagWrapperId img',
    priceSelector: '#corePrice_feature_div .a-price-whole',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    url: 'amazon.it',
    uuid: 4,
    warning: '',
    partnerUrl: '',
  },
  5: {
    fdp: 20,
    imgPreUrl: '',
    imgSelector: '#mainImageDiv img',
    name: 'BPM-Power',
    nameSelector: '.titleText h1',
    priceReplacers: [],
    priceSelector: '#divProductInfoAndHelp .prezzoScheda',
    url: 'bpm-power.com',
    uuid: 5,
    warning: "Bien Vérifier sous 5j qu'il n'y a pas de dégat sur le colis",
    partnerUrl: '',
  },
  6: {
    fdp: 0,
    uuid: 6,
    name: 'CaseKing',
    url: 'caseking.de',
    nameSelector: '#ck_detail  #detailbox h1',
    priceSelector: '#ck_detail #buybox strong',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    imgPreUrl: 'https:',
    imgSelector: '#ck_detail  #detailbox #img img',
    warning: '',
    partnerUrl: '',
  },
  7: {
    fdp: 0,
    uuid: 7,
    name: 'Cdiscount',
    url: 'cdiscount.com',
    nameSelector: '.fpTMain .fpDesCol h1',
    priceSelector: '.fTopPrice  .fpPrice',
    priceReplacers: [
      {
        replaced: '€',
        replaceBy: '.',
      },
    ],
    imgPreUrl: '',
    imgSelector: '#fpZnPrdMain img#picture0',
    warning: '',
    partnerUrl: '',
  },
  8: {
    fdp: 0,
    uuid: 8,
    name: 'Cybertek',
    url: 'cybertek.fr',
    nameSelector: '.fiche-produit__bloc-achat__container .title_fiche',
    priceSelector:
      '.fiche-produit__bloc-achat__prix  .fiche_product_price > span',
    priceReplacers: [
      {
        replaced: '€',
        replaceBy: '.',
      },
    ],
    imgPreUrl: '',
    imgSelector:
      '#fiche-produit__container-photos [data-swiper-slide-index="0"] img',
    warning: '',
    partnerUrl: '',
  },
  9: {
    fdp: 0,
    uuid: 9,
    name: 'Grosbill',
    url: 'grosbill.com',
    nameSelector: '.grb_fch-prod__content-title .grb_fch-prod__title',
    priceSelector: '.fiche-produit-r  .fiche_product_price > span.p-3x',
    priceReplacers: [
      {
        replaced: '€',
        replaceBy: '.',
      },
    ],
    imgPreUrl: 'https://www.grosbill.com',
    imgSelector: '#product_buy [data-swiper-slide-index="0"] img',
    warning: '',
    partnerUrl: '',
  },
  10: {
    fdp: 0,
    uuid: 10,
    name: '1FoDiscount',
    url: '1fodiscount.com',
    nameSelector: '.product-sheet_title',
    priceSelector: '.product-sheet_buybox .product-sheet_buybox_offer_price',
    priceReplacers: [],
    imgPreUrl: '',
    imgSelector:
      '.product-sheet_slideshow_scrollable img.product-sheet_slideshow_slide_img',
    warning: '',
    partnerUrl: '',
  },
  11: {
    fdp: 0,
    uuid: 11,
    name: 'PcComponentes FR',
    url: 'pccomponentes.fr',
    nameSelector: '#pdp-title',
    priceSelector: '#pdp-price-current-integer',
    priceReplacers: [],
    imgPreUrl: 'https:',
    imgSelector: '#pdp-section-images img',
    warning: '',
    partnerUrl: '',
  },
  12: {
    fdp: 0,
    uuid: 12,
    name: 'PcComponentes ',
    url: 'pccomponentes.com',
    nameSelector: '#pdp-title',
    priceSelector: '#pdp-price-current-integer',
    priceReplacers: [],
    imgPreUrl: 'https:',
    imgSelector: '#pdp-section-images img',
    warning: '',
    partnerUrl: '',
  },
  13: {
    fdp: 0,
    imgPreUrl: '',
    imgSelector: '.elementor-carousel-image',
    name: 'Psk Mega Store',
    nameSelector: '.ce-product-name',
    partnerUrl: '',
    priceReplacers: [],
    priceSelector: '.ce-product-prices span',
    url: 'pskmegastore.com',
    uuid: 13,
    warning: 'En test',
  },
  14: {
    fdp: 0,
    uuid: 14,
    name: 'Rue du Commerce',
    url: 'rueducommerce.fr',
    nameSelector: '.product-name > span',
    priceSelector: '.product__price .dyn_prod_price',
    priceReplacers: [],
    imgPreUrl: '',
    imgSelector: '#gallery .owl-item img',
    warning: '',
    partnerUrl: '',
  },
  15: {
    fdp: 7,
    uuid: 15,
    name: 'Reichelt',
    url: 'www.reichelt.com',
    nameSelector: '.av_articleheader [itemprop="name"]',
    priceSelector: '#av_price',
    priceReplacers: [
      {
        replaced: '.',
        replaceBy: '',
      },
    ],
    imgPreUrl: '',
    imgSelector: '#gallery img',
    warning: '',
    partnerUrl: '',
  },
  16: {
    fdp: 5,
    uuid: 16,
    name: 'TopAchat',
    url: 'topachat.com',
    nameSelector: '.ps-main__product-title',
    priceSelector: '.ps-main__offer  .offer-price__price',
    priceReplacers: [],
    imgPreUrl: 'https:',
    imgSelector: '.product-main-image.ps-main__main-image img',
    warning: '',
    partnerUrl: '',
  },
};

const emptyConfiguration: customConfiguration = {
  name: 'New Configuration',
  fdp: 0,
  uuid: 0,
  url: 'new url',
  warning: 'En test',
  priceSelector: '.ce-product-prices span',
  priceReplacers: [],
  imgSelector: '.elementor-carousel-image',
  imgPreUrl: '',
  nameSelector: '.ce-product-name',
  partnerUrl: '',
};

export { emptyConfiguration };
export { initialConfiguration };
