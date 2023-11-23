export interface customConfiguration {
  name: string;
  fdp: number;
  url: string;
  warning: string;
  nameSelector: string;
  imgSelector: string;
  imgPreUrl: string;
  priceSelector: string;
  priceReplacers: Replacer[];
}

interface Replacer {
  replaced: string;
  replaceBy: string;
}
