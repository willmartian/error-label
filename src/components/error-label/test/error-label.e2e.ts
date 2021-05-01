import { newE2EPage } from '@stencil/core/testing';

describe('error-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<error-label></error-label>');

    const element = await page.find('error-label');
    expect(element).toHaveClass('hydrated');
  });
});
