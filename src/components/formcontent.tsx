import React, { useState, useEffect } from 'react';
import { InputProps, stateInfo } from '../typescriptHelper/typescripthelpers';

const FormContent: React.FunctionComponent<InputProps> = (props: InputProps) => {
  const [user, setUser] = useState<stateInfo>({ name: '' });
  useEffect(() => {
    props.passChildData(user);
  });

  const clearFunction = () => {
    setUser({ name: '' });
    props.clearData({ hits: {}, open: false });
  };

  return (
    <>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <button type="submit" disabled={props.loading}>
        Submit<span className={`${props.loading && 'loading'}`}></span>
      </button>
      <button type="button" onClick={clearFunction}>
        Clear
      </button>
    </>
  );
};

export default FormContent;
