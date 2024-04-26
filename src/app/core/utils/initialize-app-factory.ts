import {SwService} from "../services/sw.service";

export const initializeAppFactory = (swService: SwService) => {
  return () => swService.checkForUpdate();
}