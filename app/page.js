"use client";
import ClipboardJS from "clipboard";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [generate, setGenerate] = useState();
  const [notify, setNotify] = useState(false);
  const copy = useRef(null);

  useEffect(() => {
    const clipboard = new ClipboardJS(copy.current);

    clipboard.on("success", function (e) {
      notification();
      setTimeout(() => {
        setNotify((prev) => !prev);
      }, 3000);
      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      console.error("Action:", e.action);
    });
    return () => {
      clipboard.destroy();
    };
  }, []);

  function notification() {
    setNotify((prev) => !prev);
  }
  return (
    <div className="container">
      <button
        ref={copy}
        className="generate-btn"
        onClick={() => setGenerate(Math.random())}
      >
        generate
      </button>
      <p className="generate" id="foo">
        {generate}
      </p>
      <button ref={copy} className="copy-btn" data-clipboard-target="#foo">
        {notify ? "copied" : "copy"}
      </button>
    </div>
  );
}
