import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { signal, useSignalEffect } from '@preact/signals-react';
import { Article } from './article';
import getInfos from './get-infos';
const seller = signal('');
const article = signal({} as Article);
const url = signal('');

function generateExcelClipboardString() {
  let s = `=IMAGE("${article.value.imgUrl}")\t`;
  s += `=HYPERLINK("${article.value.url}";"${article.value.name}")\t`;
  s += `${article.value.vendor}\t`;
  s += `${article.value.price} €\t`;
  navigator.clipboard.writeText(s);
}

function generateDiscordClipboardString() {
  let s = `**${article.value.name}** à **${article.value.price}€** vendu par ${article.value.vendor} : \n ${article.value.url}`;
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
          }
        });
    }
  );
};

chrome.runtime.onMessage.addListener(function (request: any) {
  console.log('popu' + request);
});

const Popup = () => {
  // chrome.action.setBadgeText({ text: count.toString() });

  useSignalEffect(analyzeUrl);

  return (
    <>
      <ul style={{ minWidth: '700px' }}>
        <li>Current URL: {url.value}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
        <li>Seller : {article.value.vendor}</li>
        <li>Article : {article.value.name}</li>
        <li>Price : {article.value.price}</li>
        <li>Image Url : {article.value.imgUrl}</li>
      </ul>

      <button onClick={analyzeUrl}> Update</button>
      <button onClick={generateExcelClipboardString}>
        {' '}
        Generate Excel String
      </button>
      <button onClick={generateDiscordClipboardString}>
        {' '}
        Generate Discord String
      </button>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
