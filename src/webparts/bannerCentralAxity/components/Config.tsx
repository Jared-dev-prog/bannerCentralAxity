import * as React from "react";

interface IMyWebPartConfigProps {
  properties: IMyWebPartProps;
  onApplyClick: () => void;
}

interface IMyWebPartProps {
  description: string;
  title: string;
}

const Config: React.FC<IMyWebPartConfigProps> = (props) => {
  const { onApplyClick } = props;
  return (
    <div>
      {/* Campos de entrada y elementos de formulario */}
      <button onClick={onApplyClick}>Aplicar</button>
    </div>
  );
};

export default Config;
