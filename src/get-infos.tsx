import { Article } from './article';
import { customConfiguration } from './customConfiguration';

const getInfos = (configuration: customConfiguration, url: string) => {
  let a: Article = {};
  a.name =
    (document.querySelector(configuration.nameSelector) as HTMLElement)
      ?.innerText ?? 'Not Found';
  a.priceText = (
    document.querySelector(configuration.priceSelector) as HTMLElement
  ).innerText;

  configuration.priceReplacers.forEach((r) => {
    a.priceText = a.priceText?.replaceAll(r.replaced, r.replaceBy);
  });

  a.vendor = configuration.name;
  a.imgUrl =
    (configuration.imgPreUrl ?? '') +
      document.querySelector(configuration.imgSelector)?.getAttribute('src') ??
    'Not Found';

  a.priceText = a.priceText?.replaceAll(',', '.').replace(/[^0-9\.]/g, '');

  a.price = Number(a.priceText);
  a.name = a.name?.replace('\n', ' ') ?? 'Not found';

  a.url = url?.replace(/\?.+/, configuration.partnerUrl) + '?';
  a.fdp = configuration.fdp;
  a.warning = configuration.warning;
  // Si selection de text, nom = selection texte
  let selection = window?.getSelection()?.toString();
  a.name = selection != '' ? selection : a?.name?.replace('"', '');
  return a;
};

export default getInfos;
