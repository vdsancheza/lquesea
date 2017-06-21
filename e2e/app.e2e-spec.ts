import { RottentCollectorPage } from './app.po';

describe('rottent-collector App', () => {
  let page: RottentCollectorPage;

  beforeEach(() => {
    page = new RottentCollectorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
