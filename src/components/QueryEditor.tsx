import { useState, useEffect } from "react";
import { styled } from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRunQuery: () => void;
}

const EditorContainer = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;

  .cm-editor {
    height: 400px;
    font-family: "Fira Code", monospace;
  }
`;

// Define the editor theme
const editorTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  ".cm-content": {
    caretColor: "#000000",
  },
  ".cm-cursor": {
    borderLeftColor: "#000000",
  },
  ".cm-activeLine": {
    backgroundColor: "#f5f5f5",
  },
  ".cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6e6e6e",
    border: "none",
  },
  ".cm-lineNumbers": {
    color: "#6e6e6e",
  },
  ".cm-keyword": { color: "#0000ff" },
  ".cm-number": { color: "#098658" },
  ".cm-string": { color: "#a31515" },
  ".cm-operator": { color: "#000000" },
  ".cm-comment": { color: "#008000" },
  ".cm-variableName": { color: "#001080" },
});

export default function QueryEditor({
  value,
  onChange,
  onRunQuery,
}: QueryEditorProps) {
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter to run query
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onRunQuery();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onRunQuery]);

  return (
    <EditorContainer>
      <CodeMirror
        value={value}
        theme={editorTheme}
        extensions={[sql()]}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
