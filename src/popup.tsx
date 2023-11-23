import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { signal, useSignalEffect } from '@preact/signals-react';
import { Article } from './article';
import getInfos from './get-infos';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { customConfiguration } from './customConfiguration';
import { Icon } from '@iconify/react';

const seller = signal('');
const article = signal({} as Article);

const preferedMethod = signal('none');
const amazonCode = signal('');
const cdiscountCode = signal('');
const rdcCode = signal('');
const showConfig = signal(false);

const customConfigurations = signal([
  {
    name: 'Psk Mega Store',
    fdp: 0,
    url: 'pskmegastore.com',
    warning: 'En test',
    priceSelector: '.ce-product-prices span',
    priceReplacers: [],
    imgSelector: '.elementor-carousel-image',
    imgPreUrl: '',
    nameSelector: '.ce-product-name',
  },
]);
const emptyConfiguration: customConfiguration = {
  name: 'New Configuration',
  fdp: 0,
  url: 'pskmegastore.com',
  warning: 'En test',
  priceSelector: '.ce-product-prices span',
  priceReplacers: [],
  imgSelector: '.elementor-carousel-image',
  imgPreUrl: '',
  nameSelector: '.ce-product-name',
};

const customConfiguration = signal(emptyConfiguration);

function generateExcelClipboardString() {
  let price = Math.round((article.value.price ?? 0) + (article.value.fdp ?? 0));
  let s = `=IMAGE("${article.value.imgUrl}")\t`;
  s += `=HYPERLINK("${article.value.url}";"${article.value.name}")\t`;
  s += `${article.value.vendor}\t`;
  s += `${price} €\t`;
  navigator.clipboard.writeText(s);
}

function generateDiscordClipboardString() {
  let price = Math.round((article.value.price ?? 0) + (article.value.fdp ?? 0));
  let s = `**${article.value.name}** à **${price}€** vendu par **${article.value.vendor}** :`;
  if (article.value.warning)
    s += `\n:warning:${article.value.warning}:warning:`;
  s += `\n${article.value.url}`;

  navigator.clipboard.writeText(s);
}

function generateTwitchClipboardString() {
  let price = Math.round((article.value.price ?? 0) + (article.value.fdp ?? 0));
  let s = `${article.value.name} à ${price}€ vendu par ${article.value.vendor} : ${article.value.url}`;
  navigator.clipboard.writeText(s);
}

const cleanVendorUrl = (url: string, vendor: string = '') => {
  if (vendor.includes('Amazon')) {
    url = url.replace(/\?.+/, `?${amazonCode}`);
  } else if (vendor.includes('CDiscount')) {
    url = url.replace(/\?.+/, `?${cdiscountCode}`);
  } else if (vendor.includes('Rue du Commerce')) {
    url = url.replace(/\?.+/, `?${rdcCode}`);
  } else {
    url = url.replace(/\?.+/, ``);
  }
  return url;
};

const analyzeUrl = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      const tab = tabs[0];

      if (
        !customConfigurations.value.some((configuration) => {
          if (tab.url.includes(configuration.url ?? '')) {
            customConfiguration.value = configuration;
          }
        })
      ) {
        customConfiguration.value = emptyConfiguration;
      }

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: getInfos,
          args: [tab.url, customConfigurations.value],
        })
        .then((injectionResults: any) => {
          for (const { frameId, result } of injectionResults) {
            article.value = result;
            article.value.url = cleanVendorUrl(tab.url, article.value.vendor);
          }
        });
    }
  );
};

chrome.runtime.onMessage.addListener(function (request: any) {
  console.log('popu' + request);
});

const handleChange = (event: any) => {
  if (event.target.id === 'name')
    article.value = { ...article.value, name: event.target.value };
  if (event.target.id === 'url')
    article.value = { ...article.value, url: event.target.value };
  if (event.target.id === 'vendor')
    article.value = { ...article.value, vendor: event.target.value };
  if (event.target.id === 'price')
    article.value = { ...article.value, price: Number(event.target.value) };
  if (event.target.id === 'fdp')
    article.value = { ...article.value, fdp: Number(event.target.value) };
  if (event.target.id === 'imgUrl')
    article.value = { ...article.value, imgUrl: event.target.value };
  if (event.target.id === 'warning')
    article.value = { ...article.value, warning: event.target.value };
};

const handleConfigurationChange = (event: any) => {
  if (event.target.id === 'name')
    customConfiguration.value = {
      ...customConfiguration.value,
      name: event.target.value,
    };
  if (event.target.id === 'warning')
    customConfiguration.value = {
      ...customConfiguration.value,
      warning: event.target.value,
    };
  if (event.target.id === 'url')
    customConfiguration.value = {
      ...customConfiguration.value,
      url: event.target.value,
    };
  if (event.target.id === 'nameSelector')
    customConfiguration.value = {
      ...customConfiguration.value,
      nameSelector: event.target.value,
    };
  if (event.target.id === 'imgSelector')
    customConfiguration.value = {
      ...customConfiguration.value,
      imgSelector: event.target.value,
    };
  if (event.target.id === 'imgPreUrl')
    customConfiguration.value = {
      ...customConfiguration.value,
      imgPreUrl: event.target.value,
    };
  if (event.target.id === 'priceSelector')
    customConfiguration.value = {
      ...customConfiguration.value,
      priceSelector: event.target.value,
    };
};

const Popup = () => {
  // chrome.action.setBadgeText({ text: count.toString() });

  useSignalEffect(() => {
    chrome.storage.sync.get(
      {
        preferedMethod: 'discord',
        amazonCode: '',
        cdiscountCode: '',
      },
      (items) => {
        preferedMethod.value = items.preferedMethod;
        amazonCode.value = items.amazonCode;
        cdiscountCode.value = items.cdiscountCode;
        rdcCode.value = items.rdcCode;
        console.log('get data from options');
        analyzeUrl();
      }
    );
  });

  const handleReplacerChange = (index: any, field: any, value: any) => {
    const newReplacers = [...customConfiguration.value.priceReplacers];
    newReplacers[index] = {
      ...newReplacers[index],
      [field]: value,
    };
    customConfiguration.value.priceReplacers = newReplacers;
  };

  const handleAddReplacer = () => {
    customConfiguration.value.priceReplacers.push({
      replaced: '',
      replaceBy: '',
    });
    customConfiguration.value = { ...customConfiguration.value };
  };

  const cardContent = {
    display: 'flex',
    'flex-direction': 'column',
    alignItems: 'strech',
    rowGap: '10px',
    minWidth: '800px',
    width: '100%',
  };
  const cardAction = {
    display: 'flex',
    width: '100%',
    columnGap: '5px',
  };

  const inputStyle = {
    width: '100%',
    flex: 1,
  };

  const priceContainerStyle = {
    display: 'flex',
    columnGap: '5px',
  };

  const priceInputStyle = {
    width: '80%',
  };

  const sellerInputStyle = {
    width: '60%',
  };

  const fdpInputStyle = {
    width: '20%',
  };

  const iconStyle = {
    marginRight: '2px',
  };

  const buttonStyle = {
    flex: 1,
  };

  const dividerStyle = {
    marginTop: '20px',
    marginBottom: '20px',
  };

  const priceReplacerStyle = {
    display: 'flex',
  };

  const priceReplacerInputWrapperStyle = {
    display: 'flex',
    'flex-direction': 'column',
    alignItems: 'strech',
    rowGap: '10px',
  };

  const priceReplacerInputStyle = {
    width: '50%',
  };

  return (
    <>
      <div style={cardContent}>
        <div style={cardContent}>
          <div style={priceContainerStyle}>
            <TextField
              style={sellerInputStyle}
              onChange={handleChange}
              value={article.value.vendor}
              id="vendor"
              label="Seller"
              defaultValue="Error"
            />

            <Button
              style={buttonStyle}
              variant={showConfig.value ? 'contained' : 'outlined'}
              onClick={() => (showConfig.value = !showConfig.value)}
            >
              <Icon
                style={iconStyle}
                icon="grommet-icons:configure"
                height="30"
              />
              Show Current Configuration
            </Button>
          </div>
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.url}
            id="url"
            multiline
            label="URL"
            defaultValue="Error"
          />

          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.name}
            id="name"
            label="Article"
            defaultValue="Error"
          />

          {!article.value.price && (
            <TextField
              style={inputStyle}
              value={article.value.priceText}
              id="name"
              label="Price Text"
              defaultValue="Error"
              helperText="Issue to get a number from the price"
            />
          )}

          <div style={priceContainerStyle}>
            <TextField
              style={priceInputStyle}
              onChange={handleChange}
              value={article.value.price}
              id="price"
              type="number"
              label="Price"
              defaultValue="0"
            />
            <TextField
              style={inputStyle}
              onChange={handleChange}
              value={article.value.fdp}
              id="fdp"
              type="number"
              label="Frais De Port"
              defaultValue="0"
            />
          </div>
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.warning}
            id="warning"
            label="Warning"
            multiline
            maxRows={4}
            defaultValue=" "
          />
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.imgUrl}
            id="imgUrl"
            label="Image Url"
            defaultValue="Error"
          />
        </div>

        <div style={cardAction}>
          <Button style={buttonStyle} variant="contained" onClick={analyzeUrl}>
            <Icon style={iconStyle} icon="charm:refresh" height="30" />
            Refresh
          </Button>
          <Button variant="contained" onClick={generateExcelClipboardString}>
            <Icon icon="simple-icons:googlesheets" height="36" />
            Share on Excel
          </Button>
          <Button variant="contained" onClick={generateDiscordClipboardString}>
            <Icon style={iconStyle} icon="ic:baseline-discord" height="30" />
            Share on Discord
          </Button>
          <Button variant="contained" onClick={generateTwitchClipboardString}>
            <Icon style={iconStyle} icon="fa6-brands:twitch" height="30" />
            Share On Twitch
          </Button>
        </div>
      </div>
      {showConfig.value && (
        <div style={cardContent}>
          <div style={cardContent}>
            <Divider style={dividerStyle} />

            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.name}
              id="name"
              label="Name"
              defaultValue="Error"
            />
            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.warning}
              id="warning"
              label="Warning"
              defaultValue="Error"
            />
            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.url}
              id="url"
              label="Url"
              defaultValue="Error"
              helperText="this configuration will be used if the url of the current website contain this text"
            />
            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.nameSelector}
              id="nameSelector"
              label="HTML Name Selector"
              defaultValue="Error"
            />
            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.imgSelector}
              id="imgSelector"
              label="HTML Image Selector"
              defaultValue="Error"
            />
            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.imgPreUrl}
              id="imgPreUrl"
              label="Img pre text"
              defaultValue=""
              helperText="Sometime the url of the picture doesn't contain the first part of the url, you can add this text in front"
            />

            <TextField
              style={inputStyle}
              onChange={handleConfigurationChange}
              value={customConfiguration.value.priceSelector}
              id="priceSelector"
              label="Price Selector"
              defaultValue="Error"
            />

            <div style={priceReplacerStyle}>
              <InputLabel>Price Replacers</InputLabel>
              <Button variant="text" onClick={handleAddReplacer}>
                <Icon style={iconStyle} icon="ic:baseline-plus" />
              </Button>
            </div>

            <div style={priceReplacerInputWrapperStyle}>
              {customConfiguration.value.priceReplacers.map(
                (replacer: any, index: any) => (
                  <div style={inputStyle} key={index}>
                    <TextField
                      style={priceReplacerInputStyle}
                      label="Replaced"
                      value={replacer.replaced}
                      onChange={(e) =>
                        handleReplacerChange(index, 'replaced', e.target.value)
                      }
                    />
                    <TextField
                      style={priceReplacerInputStyle}
                      label="Replace By"
                      value={replacer.replaceBy}
                      onChange={(e) =>
                        handleReplacerChange(index, 'replaceBy', e.target.value)
                      }
                    />
                  </div>
                )
              )}
            </div>
            <div style={cardAction}></div>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
