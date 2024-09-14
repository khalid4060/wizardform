import axios from 'axios';
import { store } from '@store';
import { updateTemplateData } from '@store/actions/templateData';
import { updateTemplateDataStatus } from '@store/actions/templateDataStatus';

function fetchWithTimeout(url, options = {}, timeoutPercentage = 10) {
  // Calculate timeout based on the given percentage (default 10%)
  const defaultTimeout = 5000; // Default timeout in milliseconds (5 seconds)
  const timeout = defaultTimeout * (1 + timeoutPercentage / 100);

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

function waitForUpdate(template, resolve) {
  const unsubscribe = store.subscribe(() => {
    const { templateData } = store.getState();
    if (templateData[template]) {
      unsubscribe();
      resolve();
    }
  });
}

async function processResponse(response, template) {
  try {
    const data = {
      template: template,
      data: await response.json(),
    };
    const dataStatus = { template: template, status: 'loaded' };
    store.dispatch(updateTemplateData(data));
    store.dispatch(updateTemplateDataStatus(dataStatus));

    await new Promise((resolve) => waitForUpdate(template, resolve));
  } catch (error) {
    // console.error(`Error processing ${template}:`, error);
  }
}

export async function fetchJSONData() {
  let result = false;

  const templates = [
    'mcq',
    'html',
    'page',
    'image',
    'fib',
    'html',
    'thinking_organizer',
    'dropdown',
    'html'
    // rest of the json files
  ];

  let dataPath = import.meta.env.VITE_DATA_PATH; // should be changed for LCMS build //
  const pageIdRef = document.getElementById('page_id');
  let pageId = '';
  if (pageIdRef && pageIdRef != '') {
    pageId = `_${pageIdRef.innerHTML}`;
  }
  const responses = await Promise.all(
    templates.map((template) =>
      fetchWithTimeout(`${dataPath}${template}${pageId}.json`).catch(
        (error) => {
          console.error(`Error fetching ${template}:`, error);
          return null; // Return null if fetching fails
        }
      )
    )
  );

  await Promise.all(
    responses.map((response, index) => {
      if (response) {
        return processResponse(response, templates[index]);
      } else {
        console.warn(
          `Skipping processing for ${templates[index]} due to fetch failure.`
        );
      }
    })
  );

  return true;
}
