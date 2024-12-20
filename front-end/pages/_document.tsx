import Document, { Html, Head, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Add your global stylesheet here */}
                    <link rel="stylesheet" href="/styles/globals.css"></link>
                    {/* <link rel="stylesheet" href="/styles/third_badboy.css" /> */}

                    {/* You can also add other external stylesheets or fonts here */}
                </Head>
                <body>
                    <Main /> {/* This is where the page content will be rendered */}
                    <NextScript /> {/* This includes necessary Next.js scripts */}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
