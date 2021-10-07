import Head from "next/head";
import icon from "../public/favicon.ico";

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <title>{title}</title>
  </Head>
);

Meta.defaultProps = {
  title: "Through the Woods",
  keywords:
    "hiking, outdoors, blog, through the woods, woods, camping, nature, mountains",
  description: "Welcome to the official blog of 'Through the Woods'",
};

export default Meta;