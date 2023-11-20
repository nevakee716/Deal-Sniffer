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

const analyzeUrl = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      const tab = tabs[0];

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: getInfos,
          args: [tab.url],
        })
        .then((injectionResults: any) => {
          for (const { frameId, result } of injectionResults) {
            article.value = result;
            article.value.url = tab.url;
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

const priceContainerStyle = {
  display: 'flex',
  columnGap: '5px',
};

const priceInputStyle = {
  width: '80%',
};

const fdpInputStyle = {
  width: '20%',
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
    article.value = { ...article.value, price: Number(event.target.value) };
  if (event.target.id === 'fdp')
    article.value = { ...article.value, fdp: Number(event.target.value) };
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
            multiline
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
          <div style={priceContainerStyle}>
            <TextField
              style={priceInputStyle}
              onChange={handleChange}
              value={article.value.price}
              id="price"
              type="number"
              label="Price"
              defaultValue="404"
            />
            <TextField
              style={fdpInputStyle}
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
