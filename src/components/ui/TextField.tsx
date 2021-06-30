import cx from 'classnames';

import './TextField.scss';

interface Props {
    textarea?: boolean,
    label?:string,
    className?: string,
    placeholder?: string,
    name?: string
}

const TextField = ({
  textarea = false, label = '', className = '', placeholder = '', name = '',
}: Props) => {
  const InputElement = textarea ? 'textarea' : 'input';

  return (
    <label className="form-group">
      <InputElement
        type="text"
        className={cx('form-control required', className)}
        placeholder={placeholder}
        required
        name={name}
      />
      <span className="required">{label}</span>
      <span className="border" aria-hidden />
    </label>
  );
};

export default TextField;
