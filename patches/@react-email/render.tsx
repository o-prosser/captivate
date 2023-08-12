import { convert } from "html-to-text";

export interface Options {
  plainText?: boolean;
}

export const render = async (
  component: React.ReactElement,
  options?: Options,
) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  if (options?.plainText) {
    return renderAsPlainText(component, options);
  }
  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = ReactDOMServer.renderToStaticMarkup(component);
  const document = `${doctype}${markup}`;

  return document;
};

const renderAsPlainText = async (
  component: React.ReactElement,
  _options?: Options,
) => {
  const ReactDOMServer = (await import("react-dom/server")).default;

  return convert(ReactDOMServer.renderToStaticMarkup(component), {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "#__react-email-preview", format: "skip" },
    ],
  });
};
