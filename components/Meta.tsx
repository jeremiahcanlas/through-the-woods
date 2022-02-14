import Head from "next/head";

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <title>{title}</title>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
      rel="stylesheet"
    />
  </Head>
);

Meta.defaultProps = {
  title: "Through the Woods",
  keywords:
    "hiking, outdoors, blog, through the woods, woods, camping, nature, mountains",
  description: "Welcome to the official blog of 'Through the Woods'",
};

export default Meta;
