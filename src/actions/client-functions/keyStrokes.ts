import { useEffect } from "react";


function useCommandKListener(onCommandK: ()=>void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // For Mac: metaKey is Command, for Windows/Linux: ctrlKey is Ctrl
      const isCommandOrCtrl = event.metaKey || event.ctrlKey;

      if (isCommandOrCtrl && event.key.toLowerCase() === 'k') {
        event.preventDefault();  
        onCommandK();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCommandK]);
}

export default useCommandKListener;
