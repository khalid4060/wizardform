import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const selectTemplateData = createSelector(
  (state) => state.templateData,
  (templateData) => templateData
);

export default function Image(props) {
  const containerRef = useRef(null);
  
  const [data, setData] = useState(null);

  const [attemptLoad, setAttemptLoad] = useState(false);
  //  const { lesson } = useSelector(R.pick(['lesson'])); //
  const templateData = useSelector(selectTemplateData); // saved json data of all the json files that was fetched in the loadData function //
  const { componentName, componentId, contentData } = props; // usually the props that is being passed to the component during the getContent //

  useEffect(() => {
    //  call whenever the template receives the new json data //
    console.log(templateData, 'templateData ssection');
    if (
      // check if the template and data of template based on the component ID is fetched //
      templateData?.[componentName] &&
      templateData[componentName][componentId] && !data
    ) {
      setData(templateData[componentName][componentId] );
    }
  }, [templateData, props, attemptLoad]);

  const templateContainerClass = classNames({
    [`${componentName}-container`]: true,
    //  add additional classes here for the template  //
  });

  return data ? (
    <div ref={containerRef} className={templateContainerClass}>
      <img src={data.url} alt="" />
    </div>
  ) : null;
}
