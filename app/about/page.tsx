// Static pages are pages that dont rely on any data from the server. All of the content is hardcoded directly into the HTML.
// To add a page first create a folder with the desired page name in the app folder and add a page.tsx file to it. The page file will export a component, which by default will be a server component.
// Any content that you add here will be rendered inside the children prop from the layout file.
// Next.js will automatically know to cache this page, because no data fetching occurs here.
import { Metadata } from "next";

// You can add the configuration variable dynamic with force-static value, if you want to explicitly tell Next that this is a static page. But like mentioned before, this is not necessary here, because Next will know automatically that this is supposed to be a static page, since no data fetching takes place here.
export const dynamic = "force-static"; // no necessary, just for demonstration

// Add Meta data to the page, use CTRL + SPACEBAR to check all of the properties available
export const metadata: Metadata = {
  title: "About Us",
  description: "About NextSpace",
};

export default function Blog() {
  return (
    <div>
      <h1>About us</h1>
      <p>We are a social media company that wants to bring people together!</p>
    </div>
  );
}
