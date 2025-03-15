// import React, { useEffect, useRef } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./styles/components.css";

const MainContainer = () => {
  // const unityContainerRef = useRef(null);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `${process.env.REACT_APP_UNITY_URL}/Build/framework.js`;
  //   script.async = true;

  //   script.onload = () => {
  //     if (window.createUnityInstance) {
  //       window.createUnityInstance(unityContainerRef.current, {
  //         dataUrl: `${process.env.REACT_APP_UNITY_URL}/Build/build.data.gz`,
  //         frameworkUrl: `${process.env.REACT_APP_UNITY_URL}/Build/build.framework.js.gz`,
  //         codeUrl: `${process.env.REACT_APP_UNITY_URL}/Build/build.wasm.gz`,
  //         streamingAssetsUrl: 'StreamingAssets',
  //         companyName: 'Cyberseeds',
  //         productName: 'Cyberseeds core',
  //         productVersion: '1.0.0',
  //       }).then(
  //         (unityInstance) => {
  //           console.log('Unity instance loaded:', unityInstance);
  //         },
  //         (message) => {
  //           console.error('Unity instance failed to load:', message);
  //         }
  //       );
  //     } else {
  //       console.error('createUnityInstance is not defined');
  //     }
  //   };

  //   script.onerror = () => {
  //     console.error('Failed to load Unity framework script');
  //   };

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // return (
  //   <div>
  //     <div
  //       ref={unityContainerRef}
  //       // style={{
  //       //   width: '100%',
  //       //   height: '100%',
  //       //   position: 'relative',
  //       // }}
  //     ></div>
  //   </div>
  // );

  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity-build/build.loader.js",
    dataUrl: "/unity-build/webgl.data",
    frameworkUrl: "/unity-build/build.framework.js",
    codeUrl: "/unity-build/build.wasm",
  });

  return (
    <div className="main-container">
      <Unity
        unityProvider={unityProvider}
        style={{ height: "100vh", width: "100%", position: "fixed" }}
      />
    </div>
  );
};

export default MainContainer;
