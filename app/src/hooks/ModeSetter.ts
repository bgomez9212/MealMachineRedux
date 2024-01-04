import { useState } from "react";

interface MutationCallback {
  (mutations: MutationRecord[], observer: MutationObserver): void;
}

export function ModeSetter() {
  const [mode, setMode] = useState("light");
  // Select the target node (in this case, the <html> element)
  const targetNode = document.documentElement;

  // Options for the observer (in this case, observing changes to attributes)
  const config = { attributes: true, attributeFilter: ["class"] };

  // Callback function to execute when changes are observed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callback: MutationCallback = (mutationsList, _observer) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        setMode(targetNode.classList[0]);
      }
    }
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  return mode;

  // Later, if you want to disconnect the observer
  // observer.disconnect();
}
