import { Project1Page } from './app.po';

describe('project1 App', () => {
  let page: Project1Page;

  beforeEach(() => {
    page = new Project1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
