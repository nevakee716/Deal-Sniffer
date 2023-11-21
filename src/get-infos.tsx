import { Article } from './article';

const getInfos = (url: String) => {
  function getAmazonInfo() {
    const a: Article = {};
    a.name = document.getElementById('productTitle')?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .querySelector('#corePrice_feature_div .a-price-whole')
        ?.childNodes[0].nodeValue?.replace(',', '.')
    );
    a.imgUrl =
      document.querySelector('#imgTagWrapperId img')?.getAttribute('src') ??
      'Not Found';

    return a;
  }

  function getPcComponentesInfo() {
    const a: Article = {};
    a.name = document.getElementById('pdp-title')?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .getElementById('pdp-price-current-integer')
        ?.childNodes[0].nodeValue?.replace(',', '.')
    );
    a.imgUrl =
      document.querySelector('#pdp-section-images img')?.getAttribute('src') ??
      'Not Found';

    return a;
  }

  function getCdiscountInfo() {
    const a: Article = {};
    a.name =
      (document.querySelector('.fpTMain .fpDesCol h1') as HTMLElement)
        ?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .querySelector('.fTopPrice  .fpPrice')
        ?.childNodes[0].nodeValue?.replace(',', '.')
    );
    a.imgUrl =
      document
        .querySelector('#fpZnPrdMain img#picture0')
        ?.getAttribute('src') ?? 'Not Found';

    return a;
  }

  function getGrosBillInfo() {
    const a: Article = {};
    a.name =
      (
        document.querySelector(
          '.grb_fch-prod__content-title .grb_fch-prod__title'
        ) as HTMLElement
      )?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .querySelector('.fiche-produit-r  .fiche_product_price > span')
        ?.childNodes[0].nodeValue?.replace('€', '')
        .replace(',', '.')
    );
    a.imgUrl =
      'https://www.grosbill.com' +
        document
          .querySelector('#product_buy [data-swiper-slide-index="0"] img')
          ?.getAttribute('src') ?? 'Not Found';

    return a;
  }

  function getCybertekInfo() {
    const a: Article = {};
    a.name =
      (
        document.querySelector(
          '.fiche-produit__bloc-achat__container .title_fiche'
        ) as HTMLElement
      )?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .querySelector(
          '.fiche-produit__bloc-achat__prix  .fiche_product_price > span'
        )
        ?.childNodes[0].nodeValue?.replace('€', '')
        .replace(',', '.')
    );
    a.imgUrl =
      document
        .querySelector(
          '#fiche-produit__container-photos [data-swiper-slide-index="0"] img'
        )
        ?.getAttribute('src') ?? 'Not Found';

    return a;
  }

  function getTopAchatInfo() {
    const a: Article = {};
    a.name =
      (document.querySelector('.ps-main__product-title') as HTMLElement)
        ?.innerText ?? 'Not Found';
    a.price = Number(
      document
        .querySelector('.ps-main__offer  .offer-price__price')
        ?.childNodes[0].nodeValue?.replace(' €', '')
        .replace(',', '.')
    );
    a.imgUrl =
      document
        .querySelector('.product-main-image.ps-main__main-image img')
        ?.getAttribute('src') ?? 'Not Found';

    return a;
  }

  function getInfoDiscountInfo() {
    const a: Article = {};
    a.name =
      (document.querySelector('.product-sheet_title') as HTMLElement)
        ?.innerText ?? 'Not Found';
    a.price = Number(
      (
        document.querySelector(
          '.product-sheet_buybox .product-sheet_buybox_offer_price'
        ) as HTMLElement
      ).innerText
        ?.replace('\n', '')
        .replace(' €', '')
        .replace(',', '.')
    );
    a.imgUrl =
      'https://www.1fodiscount.com/' +
        document
          .querySelector(
            '.product-sheet_slideshow_scrollable img.product-sheet_slideshow_slide_img'
          )
          ?.getAttribute('src') ?? 'Not Found';

    return a;
  }

  function getReicheltInfo() {
    const a: Article = {};
    a.name =
      (
        document.querySelector(
          '.av_articleheader [itemprop="name"]'
        ) as HTMLElement
      )?.innerText ?? 'Not Found';
    a.price = Number(
      (document.querySelector('#av_price') as HTMLElement).innerText?.replace(
        ',',
        '.'
      )
    );
    a.imgUrl =
      document.querySelector('#gallery img')?.getAttribute('src') ??
      'Not Found';
    return a;
  }

  function getBPMPowerInfo() {
    const a: Article = {};
    a.name =
      (document.querySelector('.titleText h1') as HTMLElement)?.innerText ??
      'Not Found';
    a.price = Number(
      (
        document.querySelector(
          '#divProductInfoAndHelp .prezzoScheda'
        ) as HTMLElement
      ).innerText
        .replace(' € ', '')
        .replace(',', '.')
    );
    a.imgUrl =
      document.querySelector('#mainImageDiv img')?.getAttribute('src') ??
      'Not Found';
    return a;
  }

  function getRDCInfo() {
    const a: Article = {};
    a.name =
      (document.querySelector('.product-name span') as HTMLElement)
        ?.innerText ?? 'Not Found';
    a.price = Number(
      (
        document.querySelector('.product__price .dyn_prod_price') as HTMLElement
      ).innerText
        .replace('€ ', '')
        .replaceAll(',', '.')
        .replaceAll(' ', '')
    );
    a.imgUrl =
      'https://www.rueducommerce.fr' +
        document.querySelector('#gallery .owl-item img')?.getAttribute('src') ??
      'Not Found';
    return a;
  }

  let a: Article = {};
  if (url.includes('pccomponentes.fr')) {
    a = getPcComponentesInfo();
    a.vendor = 'PC Componentes';
  } else if (url.includes('pccomponentes.com')) {
    a = getPcComponentesInfo();
    a.vendor = 'PC Componentes ES';
  } else if (url.includes('amazon.fr')) {
    a = getAmazonInfo();
    a.vendor = 'Amazon FR';
  } else if (url.includes('amazon.de')) {
    a = getAmazonInfo();
    a.vendor = 'Amazon DE';
  } else if (url.includes('amazon.it')) {
    a = getAmazonInfo();
    a.vendor = 'Amazon IT';
  } else if (url.includes('amazon.es')) {
    a = getAmazonInfo();
    a.vendor = 'Amazon ES';
  } else if (url.includes('cdiscount.com')) {
    a = getCdiscountInfo();
    a.vendor = 'CDiscount';
  } else if (url.includes('grosbill.com')) {
    a = getGrosBillInfo();
    a.vendor = 'GrosBill';
  } else if (url.includes('cybertek.fr')) {
    a = getCybertekInfo();
    a.vendor = 'Cybertek';
  } else if (url.includes('topachat.com')) {
    a = getTopAchatInfo();
    a.vendor = 'TopAchat';
  } else if (url.includes('1fodiscount.com')) {
    a = getInfoDiscountInfo();
    a.vendor = '1foDiscount';
  } else if (url.includes('reichelt.com')) {
    a = getReicheltInfo();
    a.vendor = 'Reichelt';
  } else if (url.includes('bpm-power.com')) {
    a = getBPMPowerInfo();
    a.vendor = 'BPM-Power';
    a.warning = "Bien Vérifier sous 5j qu'il n'y a pas de dégat sur le colis";
  } else if (url.includes('rueducommerce.fr')) {
    a = getRDCInfo();
    a.vendor = 'Rue du Commerce';
  }
  let selection = window?.getSelection()?.toString();
  a.name = selection != '' ? selection : a?.name?.replace('"', '');
  return a;
};

export default getInfos;
