import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { signal, useSignalEffect } from '@preact/signals-react';
import { Article } from './article';
import getInfos from './get-infos';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { Icon } from '@iconify/react';

const seller = signal('');
const article = signal({} as Article);
const url = signal('');
const text = signal('');

function generateExcelClipboardString() {
  let s = `=IMAGE("${article.value.imgUrl}")\t`;
  s += `=HYPERLINK("${article.value.url}";"${article.value.name}")\t`;
  s += `${article.value.vendor}\t`;
  s += `${article.value.price} €\t`;
  navigator.clipboard.writeText(s);
}

function generateDiscordClipboardString() {
  let s = `**${article.value.name}** à **${article.value.price}€** vendu par **${article.value.vendor}** :`;
  if (article.value.warning)
    s += `\n:warning:${article.value.warning}:warning:`;
  s += `\n${article.value.url}`;
  navigator.clipboard.writeText(s);
}

const analyzeUrl = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      const tab = tabs[0];
      url.value = tabs[0].url;

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: getInfos,
          args: [url.value],
        })
        .then((injectionResults: any) => {
          for (const { frameId, result } of injectionResults) {
            article.value = result;
            article.value.url = url.value;
            text.value = 'roto';
          }
        });
    }
  );
};

chrome.runtime.onMessage.addListener(function (request: any) {
  console.log('popu' + request);
});

const cardContent = {
  display: 'flex',
  'flex-direction': 'column',
  alignItems: 'strech',
  rowGap: '10px',
  minWidth: '800px',
};
const cardAction = {
  display: 'flex',
  columnGap: '5px',
};

const inputStyle = {
  width: '100%',
};

const iconStyle = {
  marginRight: '2px',
};

const handleChange = (event: any) => {
  if (event.target.id === 'name')
    article.value = { ...article.value, name: event.target.value };
  if (event.target.id === 'url')
    article.value = { ...article.value, url: event.target.value };
  if (event.target.id === 'vendor')
    article.value = { ...article.value, vendor: event.target.value };
  if (event.target.id === 'price')
    article.value = { ...article.value, price: event.target.value };
  if (event.target.id === 'imgUrl')
    article.value = { ...article.value, imgUrl: event.target.value };
  if (event.target.id === 'warning')
    article.value = { ...article.value, warning: event.target.value };
};

const Popup = () => {
  // chrome.action.setBadgeText({ text: count.toString() });

  useSignalEffect(analyzeUrl);

  return (
    <>
      <div style={cardContent}>
        <div style={cardContent}>
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.url}
            id="url"
            label="URL"
            defaultValue="Error"
          />
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.vendor}
            id="vendor"
            label="Seller"
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
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.price}
            id="price"
            label="Price"
            defaultValue="Error"
          />
          <TextField
            style={inputStyle}
            onChange={handleChange}
            value={article.value.warning}
            id="warning"
            label="Warning"
            defaultValue=""
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
          <Button variant="contained" onClick={analyzeUrl}>
            <Icon style={iconStyle} icon="charm:refresh" height="30" />
            Refresh
          </Button>
          <Button variant="contained" onClick={generateExcelClipboardString}>
            <Icon icon="simple-icons:googlesheets" height="36" />
            Generate Excel String
          </Button>
          <Button variant="contained" onClick={generateDiscordClipboardString}>
            <Icon style={iconStyle} icon="ic:baseline-discord" height="30" />
            Generate Discord String
          </Button>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
