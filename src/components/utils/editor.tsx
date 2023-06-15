import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

interface Props {
  value?: string;
  setValue?: () => void;
  readOnly?: boolean;
}

const Editor: React.FC<Props> = ({ value, setValue, readOnly = false }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      //   ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme={readOnly ? "bubble" : "snow"}
      value={value}
      onChange={setValue}
      modules={modules}
      placeholder="Escribir aqui .."
      readOnly={readOnly}
      style={{
        height: "100%",
      }}
    />
  );
};

export default Editor;
