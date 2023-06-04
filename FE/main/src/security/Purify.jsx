import React from "react";
import DOMPurify from "dompurify";

function Purify(props) {
  const rawHTML = props;
  const config = {
    ADD_TAGS: ['iframe'], // iframe 추가
    ADD_ATTR: ['allowfullscreen'], // allowfullscreen 속성 추가
  };
  const cleanHTML = DOMPurify.sanitize(rawHTML, config);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

export default Purify;
