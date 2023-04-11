import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};
//Use web speech API to receive speech input and convert it to text


export default function Index() {
  const startDictation = () => {
  }
  return (
    <>
    <div className="text-4xl text-center">Welcome to Speech to Text</div>
    <input type="button" value="Ask.." onClick={startDictation} />
    </>);
}
