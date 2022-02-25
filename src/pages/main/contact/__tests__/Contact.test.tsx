import userEvent from '@testing-library/user-event';
import { sendForm } from 'emailjs-com';

import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import Contact from '../Contact';

const setup = () => {
  const utils = render(<Contact />);
  const name = screen.getByLabelText('Name');
  const email = screen.getByLabelText('E-mail');
  const message = screen.getByLabelText('Message');
  return { name, email, message, ...utils };
};

const mockedSendForm = sendForm as jest.Mock;

jest.mock('emailjs-com', () => {
  return {
    __esModule: true,
    sendForm: jest.fn(),
  };
});

test('form success', async () => {
  mockedSendForm.mockImplementation(() => Promise.resolve(true));
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const { name, email, message } = setup();
  fireEvent.change(name, { target: { value: 'name' } });
  fireEvent.change(email, { target: { value: 'email@email.com' } });
  fireEvent.change(message, { target: { value: 'message' } });

  const button = screen.getByRole('button');
  userEvent.click(button);
  await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
});

const OLD_ENV = process.env;
test('form error', async () => {
  process.env = { NODE_ENV: OLD_ENV.NODE_ENV, PUBLIC_URL: OLD_ENV.PUBLIC_URL };
  mockedSendForm.mockImplementation(() => Promise.reject({ text: 'error' }));
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const { name, email, message } = setup();
  fireEvent.change(name, { target: { value: 'name' } });
  fireEvent.change(email, { target: { value: 'email@email.com' } });
  fireEvent.change(message, { target: { value: 'message' } });

  const button = screen.getByRole('button');
  userEvent.click(button);
  await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
  process.env = OLD_ENV;
});
