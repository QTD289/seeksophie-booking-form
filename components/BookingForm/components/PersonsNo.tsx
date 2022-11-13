import classNames from 'classnames';
import { FaRegMinusSquare, FaRegPlusSquare, FaUser } from 'react-icons/fa';

import { useFormStore } from 'stores';

export const PersonsNo = (): JSX.Element => {
  const { maxPersonsNo, personsNo, changePersonsNo } = useFormStore();

  return (
    <div
      className={classNames('field persons-no', { selected: personsNo > 0 })}
    >
      <div className="icon">
        <FaUser />
      </div>
      <div className="placeholder">Number of Persons</div>
      <div
        className={classNames('minus', { disabled: personsNo < 1 })}
        onClick={() => changePersonsNo(personsNo - 1)}
      >
        <FaRegMinusSquare />
      </div>
      <input
        type="number"
        min="0"
        value={personsNo}
        onChange={(e) => changePersonsNo(e.target.value)}
      />
      <div
        className={classNames('plus', { disabled: personsNo >= maxPersonsNo })}
        onClick={() => changePersonsNo(personsNo + 1)}
      >
        <FaRegPlusSquare />
      </div>
    </div>
  );
};
