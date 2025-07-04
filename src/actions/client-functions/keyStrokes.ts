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


type ArrowKeyCallbacks = {
  ArrowLeft?: () => void
  ArrowRight?: () => void
}

function useArrowKeyListener(callbacks: ArrowKeyCallbacks) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" && callbacks.ArrowLeft) {
        event.preventDefault()
        callbacks.ArrowLeft()
      }

      if (event.key === "ArrowRight" && callbacks.ArrowRight) {
        event.preventDefault()
        callbacks.ArrowRight()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [callbacks])
}




function useEscKeyListener(onEscKey: () => void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscKey();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscKey]);
}


export  {useCommandKListener, useArrowKeyListener,useEscKeyListener};
