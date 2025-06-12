import { BusSearchPage } from '../support/BusSearchPage';

const busPage = new BusSearchPage();

describe('IRCTC Bus Search', () => {
  beforeEach(() => {
    busPage.clearStorage();
    busPage.visit();
  });

  it('should select Pune to Mumbai on 30 June 2025', () => {
    busPage.selectSourceCity('Pune', 'Pune');
    busPage.selectDestinationCity('Mumbai', 'Mumbai International Airport');
    busPage.selectDate(13, 'June', 2025);

  });
});
