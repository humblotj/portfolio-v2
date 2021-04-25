import './Contact.scss';
import Button from '../../../components/ui/Button';
import TextField from '../../../components/ui/TextField';
import { ReactComponent as SendIcon } from '../../../assets/icons/send.svg';

const Contact = () => (
  <div className="contact">
    <h2>Contact</h2>
    <div className="send-message">
      <h3>Send me a message</h3>
      <p>
        Have a question or want to work together?
      </p>
      <form action="">
        <TextField label="Name" />
        <TextField label="E-mail" />
        <TextField label="Message" textarea />
        <Button type="submit" color="red">Send Message</Button>
      </form>
    </div>
    <div className="send-email">
      <h3>Send me an email</h3>
      <a href="mailto:jhumblot1@gmail.com">
        <SendIcon />
        jhumblot1@gmail.com
      </a>
    </div>
  </div>
);

export default Contact;
