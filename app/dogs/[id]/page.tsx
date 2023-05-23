import { Metadata } from "next";

// Add Meta data to the page, use CTRL + SPACEBAR to check all of the properties available
export const metadata: Metadata = {
  title: "Dogs",
  description: "Dogs",
};

export default function Dogs() {
  return (
    <div>
      <h1>Dogs</h1>
      <p>Dogs page</p>
    </div>
  );
}
