import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService(null);
    appController = new AppController(appService);
  });

  describe('getAppInfo', () => {
    it('should return app status', async () => {
      const info = {
        message: `Schoolzone is running in port 3000. Connected to localhost`,
      };
      jest.spyOn(appService, 'appStatus').mockImplementation(() => info);
      expect(await appController.healthCheck().message).toEqual(info.message);
    });
  });
});
