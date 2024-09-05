import React, { useEffect, useState, Suspense ,useRef} from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getContent } from "@utils/functionHelper";
import { updateLessonData } from "@store/actions/lesson";
import { createSelector } from 'reselect';
import axios from "axios";
import { saveTranslation } from "@store/actions/translation";
import { fetchJSONData } from "@utils/templateLoader";
import '@assets/js/global-jquery.js';

const selectTemplateData = createSelector(
  (state) => state.templateData,
  (templateData) => templateData
);

export default function MainPage() {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const templateData = useSelector(selectTemplateData);
  const [attemptLoad, setAttemptLoad] = useState(false);
  const canvasRef = useRef(null);
  const onResizeWindow = () => {
    const shellWidth = 1280;
    const shellHeight = 832;
    let newShellHeight;
    let newShellWidth;
    const actWid = Number(window.innerWidth);
    const actHgt = Number(window.innerHeight);
    let scale = 1;

    const mainContainer = document.getElementById('root');

    if (actHgt < actWid) {
      newShellHeight = actHgt;
      scale = Number(shellHeight / newShellHeight).toFixed(5);
      newShellWidth = (shellWidth / shellHeight) * newShellHeight;
      const _aleft = actWid / 2 - Number(newShellWidth) / 2;
      if (_aleft < 0) {
        newShellWidth = actWid;
        scale = Number(shellWidth / newShellWidth).toFixed(5);
        newShellHeight = (shellHeight / shellWidth) * newShellWidth;
      }
    } else {
      newShellWidth = actWid;
      scale = Number(shellWidth / newShellWidth).toFixed(5);
      newShellHeight = (shellHeight / shellWidth) * newShellWidth;
    }

    const scaleVal = 1 / scale;
    const scaleY = shellHeight / newShellHeight;
    window.scaleVal = scaleVal;
    mainContainer.style.transformOrigin = "left top";
    mainContainer.style.msTransformOrigin = "left top";
    mainContainer.style.WebkitTransformOrigin = "left top";

    mainContainer.style.transform = `scale( ${scaleVal} )`;
    mainContainer.style.msTransform = `scale( ${scaleVal} )`;
    mainContainer.style.WebkitTransform = `scale( ${scaleVal} )`;

    const _left = actWid / 2 - Number(newShellWidth) / 2;
    const _top = actHgt / 2 - Number(newShellHeight) / 2;

    mainContainer.style.left = `${_left}px`;
    mainContainer.style.top = `${_top}px`;
    mainContainer.style.width = `${shellWidth}px`;
    mainContainer.style.height = `${shellHeight}px`;
    mainContainer.dataset.scale = scaleVal;
    mainContainer.dataset.scaleY = scaleY;
    const r = document.querySelector(":root");
    r.style.setProperty("--scale", scaleVal);
    r.style.setProperty("--scaleY", scaleY);
  };

  useEffect(() => {
    //  call once when the template renders //

    if (templateData?.page) {
      // console.log(templateData.page, "templateData page");
      // check if there's a saved data //
      setData(templateData.page);
      const { page_direction } = templateData.page;
      document.body.dir = page_direction;
      document.body.style.direction = page_direction;
      // if( templateData.page )
      dispatch(updateLessonData(templateData.page));
    } else {
     
      if (!attemptLoad) {
        // console.log(pageData, "load page data")
        fetchJSONData();
        setAttemptLoad(true);
      }
    }
  }, [templateData, attemptLoad]);

  useEffect(() => {
    let axioFetch;
    if (process.env.NODE_ENV === 'development') {
      // Fetch from local path in development
      axioFetch =  axios.get('json/translation.json');
    } else {
      // Fetch from the base folder in production using the custom environment variable
      axioFetch =  axios.get(`${import.meta.env.VITE_BASE_URL}json/translation.json`);
    }
    axioFetch.then((response) => {
      if (response.data) {
        dispatch(saveTranslation(response.data));
        setLoading(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    window.onresize = onResizeWindow;
    onResizeWindow();
    setTimeout(() => {
      onResizeWindow();
    }, 1000);
  }, []);

  useEffect(() => {
    window.parentCopy = window.parent;
  }, []);

  const pageClasses = classNames({
    "main-page-container": true,
  });

  return (
    data && !loading && (
      <div className={pageClasses}>
        <div className="presentation-wrapper">
          <Suspense fallback={<h1>loading....</h1>}>
            {getContent(data.content)}
          </Suspense>
        </div>
      </div>
    )
  );
}
