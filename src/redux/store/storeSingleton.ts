import { MainLayoutStore, mainLayoutStore } from "./mainLayoutStore";

// creates a singleton instance of MainLayoutStore, now we can use multiple providers 
// without creating multiple instances of the store

class StoreSingleton {
  private static instance: MainLayoutStore;

  public static getInstance(): MainLayoutStore {
    if (!StoreSingleton.instance) {
      StoreSingleton.instance = mainLayoutStore();
    }
    return StoreSingleton.instance;
  }
}

export { StoreSingleton };
