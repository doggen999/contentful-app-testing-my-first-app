import React, { useState, useEffect } from "react";
import { List, ListItem, Note } from "@contentful/f36-components";
import { SidebarExtensionSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import readingTime from "reading-time";

const CONTENT_FIELD_ID = "body";

const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [blogText, setBlogText] = useState(contentField.getValue());
  const stats = readingTime(blogText || "");

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBlogText(value);
    });
    return detach;
  }, [contentField]);

  return (
    <>
      <Note style={{ marginBottom: "12px" }}>
        Metrics for your blog post:
        <List style={{ marginTop: "12px" }}>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;
