export const JsHtmlPage = script =>
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Signature Pad demo</title>
  <meta name="description" content="Signature Pad - HTML5 canvas based smooth signature drawing using variable width spline interpolation.">

  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <style>    
    .m-signature-pad {
      position: absolute;
      font-size: 10px;
      width: 700px;
      height: 400px;
      top: 50%;
      left: 50%;
      margin-left: -350px;
      margin-top: -200px;
      background-color: #fff;
    }
    
    .m-signature-pad:before, 
    .m-signature-pad:after {
      position: absolute;
      z-index: -1;
      content: "";
      width: 40%;
      height: 10px;
      left: 20px;
      bottom: 10px;
      background: transparent;
      -webkit-transform: skew(-3deg) rotate(-3deg);
      -moz-transform: skew(-3deg) rotate(-3deg);
      -ms-transform: skew(-3deg) rotate(-3deg);
      -o-transform: skew(-3deg) rotate(-3deg);
      transform: skew(-3deg) rotate(-3deg);
    }
    
    .m-signature-pad:after {
      left: auto;
      right: 20px;
      -webkit-transform: skew(3deg) rotate(3deg);
      -moz-transform: skew(3deg) rotate(3deg);
      -ms-transform: skew(3deg) rotate(3deg);
      -o-transform: skew(3deg) rotate(3deg);
      transform: skew(3deg) rotate(3deg);
    }
    
    .m-signature-pad--body {
      position: absolute;
      left: 10px;
      right: 10px;
      top: 10px;
      bottom: 80px;
      border: 1px solid #E2231A;
    }
    
    .m-signature-pad--body canvas {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    
    .m-signature-pad--footer {
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 20px;
      height: 50px;
    }
    
    .m-signature-pad--footer
      .description {
        color: #C3C3C3;
        text-align: center;
        font-size: 1.2em;
        margin-top: 1.8em;
      }
    
    .m-signature-pad--footer .button {
        position: absolute;
        bottom: 0;
        background-color: #E2231A;
        border-color: transparent;
        border-radius: 0;
        color: #fff;
        font-size: 18px;
        padding: 10px 0;
        elevation: 0;
        width: 100%;
      }
    
    @media screen and (max-width: 1024px) {
      .m-signature-pad {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: auto;
        height: auto;
        min-width: 250px;
        min-height: 140px;
        margin: 0;
      }
      #github {
        display: none;
      }
    }
    
    @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      .m-signature-pad {
        margin: 10%;
      }
    }
    
    @media screen and (max-height: 320px) {
      .m-signature-pad--body {
        left: 0;
        right: 0;
        top: 0;
        bottom: 50px;
      }
      .m-signature-pad--footer {
        left: 20px;
        right: 20px;
        bottom: 4px;
        height: 28px;
      }
      .m-signature-pad--footer
        .description {
          font-size: 1em;
          margin-top: 1em;
        }
    }
    </style>
</head>
<body onselectstart="return false">
  <div id="signature-pad" class="m-signature-pad">
    <div class="m-signature-pad--body">
      <canvas></canvas>
    </div>
    <div class="m-signature-pad--footer">
      <button type="button" class="button" data-action="clear"><%clear%></button>
    </div>
  </div>

  <script>
    ${script}
  </script>
</body>
</html>`;
