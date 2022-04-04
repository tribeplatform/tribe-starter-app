import React from 'react';

export default function AppLayout(props) {
  return <>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Starter App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="root">{props.children}</div>
    </body>
  </html>
  </>;
}


