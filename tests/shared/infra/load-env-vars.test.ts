import path from 'path';

describe('[dotenv-config]', () => {
  const mockedFunction = jest.fn();

  jest.mock('dotenv', () => ({
    config: mockedFunction,
  }));

  it('should call dotenv config without error', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: path.resolve(__dirname, './.env') });
    expect(mockedFunction).toHaveBeenCalled();
  });
});
