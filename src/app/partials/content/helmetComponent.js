import React from "react";
import Helmet from "react-helmet";

const TitleComponent = ({ title, image, desc }) => {
  var defaultTitle = "Wallet";
  var defaultImage = "/media/logos/logo-mini-md.png";
  var defaultDes = "Wallet, A interactive learning page";

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={desc ? desc : defaultDes} />
      <meta property="image" content={image ? image : defaultImage} />
      <meta property="og:description" content={desc ? desc : defaultDes} />
      <meta property="og:image" content={image ? image : defaultImage} />
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export { TitleComponent };
