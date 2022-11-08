import { FaCartPlus } from 'react-icons/fa';

export const Addon = (): JSX.Element => {
  return (
    <div className="field addon">
      <div className="icon">
        <FaCartPlus />
      </div>
      <div className="placeholder">Select Add-on(s)</div>
    </div>
  );
};
