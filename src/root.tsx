import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

// Initialize Firebase
export default component$(() => {

  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  return (

    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      
      <body class="bg-gradient-to-tr from-sky-900 to-sky-800    xl:bg-[#00132E] " lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>

  );
});
