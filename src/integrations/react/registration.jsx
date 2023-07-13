
/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { QrReader } from 'react-qr-reader';
export const QRReader = qwikify$(QrReader);
import BarCodeScanner from "react-qr-barcode-scanner";
import ScanbotSDK from 'scanbot-web-sdk/webpack'

export const BarCode = qwikify$(BarCodeScanner)
import { Oval } from 'react-loader-spinner';
export const O = () => {
    <Oval wrapperClass='mx-auto'></Oval>
}
export const Ov = qwikify$(O)