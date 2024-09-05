import React from 'react';
import { getComponent } from '@utils/functionHelper'; // Import the templatesName object

export const handleGetComponent = (data) => {
  const rootPath = './'; // for components that needs to fetch another json data like DND: html json for the sentence //
  if (data && data.component_name) {
    const CompName = getComponent(data.component_name); // get the Lazy import from the templateMapping //
    if (CompName) {
      if (data.component_name == 'column') {
        return (
          <CompName
            key={`column_${data.component_id}`}
            componentId={data.component_id}
            componentName={data.component_name}
            fileName={data.file_name}
            dataPath={rootPath}
            classes={data.classes}
            columnData={data.column_data}
            contentData={data}
          />
        );
      } else {
        return (
          <CompName // this will be returned component that should be wrapped inside the Suspense //
            key={`${data.component_name}_${data.component_id}`}
            componentId={data.component_id}
            componentName={data.component_name}
            fileName={data.file_name}
            contentData={data}
            dataPath={rootPath}
          />
        );
      }
    } else {
      return <>Cannot find component</>;
    }
  } else {
    return <>Cannot find component</>;
  }
};

export default function getContent(content) {
  let renderComponent = null;
  if (Array.isArray(content)) {
    // check if the content is an array, if it's an array loop to the arary and get the content //
    renderComponent = content.map((data) => handleGetComponent(data));
  } else {
    renderComponent = handleGetComponent(content);
  }
  return renderComponent;
}
