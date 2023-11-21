import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { signal, useSignalEffect } from '@preact/signals-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from '@iconify/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';

const preferedMethod = signal('none');
const amazonCode = signal('');
const cdiscountCode = signal('');
const rdcCode = signal('');
const status = signal(false);

const Options = () => {
  useSignalEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        preferedMethod: 'discord',
        amazonCode: '',
        cdiscountCode: '',
        rdcCode: '',
      },
      (items) => {
        preferedMethod.value = items.preferedMethod;
        amazonCode.value = items.amazonCode;
        cdiscountCode.value = items.cdiscountCode;
        rdcCode.value = items.rdcCode;
      }
    );
  });

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        preferedMethod: preferedMethod.value,
        amazonCode: amazonCode.value,
        cdiscountCode: cdiscountCode.value,
        rdcCode: rdcCode.value,
      },
      () => {
        status.value = true;
        const id = setTimeout(() => {
          status.value = false;
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

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

  const handleMethodChange = (event: any) => {
    preferedMethod.value = event.target.value;
  };

  const iconStyle = {
    marginRight: '2px',
  };

  return (
    <>
      <div style={cardContent}>
        <div style={cardContent}>
          <TextField
            style={inputStyle}
            onChange={(e) => (amazonCode.value = e.target.value)}
            value={amazonCode.value}
            id="amazon"
            label="Amazon Id Partner"
            defaultValue=""
            helperText="Will replace everything after the ? in the url"
          />
          <TextField
            style={inputStyle}
            onChange={(e) => (cdiscountCode.value = e.target.value)}
            value={cdiscountCode.value}
            id="cdiscount"
            label="Cdiscount ID partner"
            defaultValue=""
            helperText="Will replace everything after the ? in the url"
          />
          <TextField
            style={inputStyle}
            onChange={(e) => (rdcCode.value = e.target.value)}
            value={rdcCode.value}
            id="rdc"
            label="Rue du commerce ID partner"
            defaultValue=""
            helperText="Will replace everything after the ? in the url"
          />
        </div>

        <div style={cardAction}>
          <Button variant="contained" onClick={saveOptions}>
            <Icon style={iconStyle} icon="pixelarticons:save" />
            Save
          </Button>
        </div>
        <Snackbar
          open={status.value}
          autoHideDuration={1000}
          message="Configuration Saved"
        />
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
