import { newE2EPage } from '@stencil/core/testing';

describe('error-label-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<error-label-group></error-label-group>');

    const element = await page.find('error-label-group');
    expect(element).toHaveClass('hydrated');
  });
});
