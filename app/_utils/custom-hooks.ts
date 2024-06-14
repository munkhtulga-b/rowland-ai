import { useState, useEffect } from "react";

export const useTypewriter = (text: string) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.split(" ").length - 1) {
        setDisplayText((prevText) => prevText + " " + text.split(" ")[i]);
        i++;
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return displayText;
};
