import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { signal, useSignalEffect } from '@preact/signals-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from '@iconify/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import {
  customConfiguration,
  initialConfiguration,
  emptyConfiguration,
} from './customConfiguration';

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const status = signal(false);
const customConfigurations = signal(initialConfiguration);
const expended = signal(0);

chrome.storage.sync.get(
  {
    configurations: initialConfiguration,
  },
  (items) => {
    const c = items.configurations;
    Object.keys(initialConfiguration).forEach((key) => {
      if (Object.keys(c).indexOf(key) === -1) {
        c[key] = initialConfiguration[Number(key)];
      }
    });

    customConfigurations.value = c;
  }
);

const Options = () => {
  console.log('render global options');

  const [expanded, setExpanded] = React.useState<number | boolean>(false);
  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      { configurations: customConfigurations.value },
      () => {
        status.value = true;
        const id = setTimeout(() => {
          status.value = false;
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddConfiguration = () => {
    let c = { ...emptyConfiguration };
    c.uuid = new Date().getTime();

    let cs = {
      ...customConfigurations.value,
    };
    cs[c.uuid] = c;
    customConfigurations.value = cs;
  };

  const handleResetConfiguration = () => {
    customConfigurations.value = initialConfiguration;
  };

  const handleReplacerChange = (
    customConfiguration: customConfiguration,
    index: any,
    field: any,
    value: any
  ) => {
    const newReplacers = [...customConfiguration.priceReplacers];
    newReplacers[index] = {
      ...newReplacers[index],
      [field]: value,
    };
    customConfiguration.priceReplacers = newReplacers;
    let c = {
      ...customConfigurations.value,
    };
    c[customConfiguration.uuid] = customConfiguration;
    customConfigurations.value = c;
  };

  const handleAddReplacer = (customConfiguration: customConfiguration) => {
    customConfiguration.priceReplacers.push({
      replaced: '',
      replaceBy: '',
    });
    let c = {
      ...customConfigurations.value,
    };
    c[customConfiguration.uuid] = customConfiguration;
    customConfigurations.value = c;
  };

  const handleDelete = (customConfiguration: customConfiguration) => {
    let c = {
      ...customConfigurations.value,
    };
    delete c[customConfiguration.uuid];
    customConfigurations.value = c;
  };

  const handleConfigurationChange = (
    event: any,
    customConfiguration: customConfiguration
  ) => {
    if (event.target.id === 'name')
      customConfiguration.name = event.target.value;
    if (event.target.id === 'warning')
      customConfiguration.warning = event.target.value;
    if (event.target.id === 'url') customConfiguration.url = event.target.value;
    if (event.target.id === 'nameSelector')
      customConfiguration.nameSelector = event.target.value;
    if (event.target.id === 'imgSelector')
      customConfiguration.imgSelector = event.target.value;
    if (event.target.id === 'imgPreUrl')
      customConfiguration.imgPreUrl = event.target.value;
    if (event.target.id === 'priceSelector')
      customConfiguration.priceSelector = event.target.value;
    if (event.target.id === 'partnerUrl')
      customConfiguration.partnerUrl = event.target.value;

    let c = {
      ...customConfigurations.value,
    };
    c[customConfiguration.uuid] = customConfiguration;
    customConfigurations.value = c;
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
    marginTop: '10px',
    marginBottom: '10px',
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

  const wrapperStyle = {
    minHeight: '550px',
  };

  return (
    <>
      <div style={wrapperStyle}>
        {Object.values(customConfigurations.value)
          .sort((a, b) => a.uuid - b.uuid)
          .map((customConfiguration: customConfiguration) => (
            <Accordion
              expanded={expanded === customConfiguration.uuid}
              onChange={handleChange(customConfiguration.uuid)}
            >
              <AccordionSummary
                expandIcon={<Icon icon="ooui:expand" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {customConfiguration.name} - {customConfiguration.uuid}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {customConfiguration.url}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={cardContent}>
                  <div style={cardContent}>
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.name}
                      id="name"
                      label="Name"
                      defaultValue="Error"
                    />
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.warning}
                      id="warning"
                      label="Warning"
                      defaultValue="Error"
                    />
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.url}
                      id="url"
                      label="Url"
                      defaultValue="Error"
                      helperText="this configuration will be used if the url of the current website contain this text"
                    />
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.nameSelector}
                      id="nameSelector"
                      label="HTML Name Selector"
                      defaultValue="Error"
                    />
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.imgSelector}
                      id="imgSelector"
                      label="HTML Image Selector"
                      defaultValue="Error"
                    />
                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.imgPreUrl}
                      id="imgPreUrl"
                      label="Img pre text"
                      defaultValue=""
                      helperText="Sometime the url of the picture doesn't contain the first part of the url, you can add this text in front"
                    />

                    <TextField
                      style={inputStyle}
                      onChange={(e: any) =>
                        handleConfigurationChange(e, customConfiguration)
                      }
                      value={customConfiguration.priceSelector}
                      id="priceSelector"
                      label="Price Selector"
                      defaultValue="Error"
                    />

                    <div style={priceReplacerStyle}>
                      <InputLabel>Price Replacers</InputLabel>
                      <Button
                        variant="text"
                        onClick={(e) => handleAddReplacer(customConfiguration)}
                      >
                        <Icon style={iconStyle} icon="ic:baseline-plus" />
                      </Button>
                    </div>

                    <div style={priceReplacerInputWrapperStyle}>
                      {customConfiguration.priceReplacers.map(
                        (replacer: any, index: any) => (
                          <div style={inputStyle} key={index}>
                            <TextField
                              style={priceReplacerInputStyle}
                              label="Replaced"
                              value={replacer.replaced}
                              onChange={(e) =>
                                handleReplacerChange(
                                  customConfiguration,
                                  index,
                                  'replaced',
                                  e.target.value
                                )
                              }
                            />
                            <TextField
                              style={priceReplacerInputStyle}
                              label="Replace By"
                              value={replacer.replaceBy}
                              onChange={(e) =>
                                handleReplacerChange(
                                  customConfiguration,
                                  index,
                                  'replaceBy',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        <Divider style={dividerStyle} />
        <div style={cardContent}>
          <div style={cardAction}>
            <Button variant="contained" onClick={saveOptions}>
              <Icon style={iconStyle} icon="pixelarticons:save" />
              Save
            </Button>
            <Button variant="contained" onClick={handleAddConfiguration}>
              <Icon style={iconStyle} icon="pixelarticons:plus" />
              New Configuration
            </Button>
            <Button variant="contained" onClick={handleResetConfiguration}>
              <Icon style={iconStyle} icon="pixelarticons:recycle" />
              Reset Configuration
            </Button>
          </div>
          <Snackbar
            open={status.value}
            autoHideDuration={1000}
            message="Configuration Saved"
          />
        </div>
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
