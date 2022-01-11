import React, { useEffect, useState, useRef } from "react";

// Solution-1 start
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// --- end

function Editor({ setData }) {
  // Solution-2 start
  let editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  // --- end
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          console.log("Editor is ready to use!");
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;