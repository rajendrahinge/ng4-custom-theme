import { Ng4CustomThemePage } from './app.po';

describe('ng4-custom-theme App', () => {
  let page: Ng4CustomThemePage;

  beforeEach(() => {
    page = new Ng4CustomThemePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
