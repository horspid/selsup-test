import React, { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: string[]; // Добавлено для расширяемости
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  modelValues: ParamValue[];
  params: Param[];
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
  { id: 3, name: "Ширина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
    { paramId: 3, value: "минимальная" },
  ],
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const modelValues = this.props.model.paramValues;

    this.state = { modelValues, params };
  }

  onChangeHandler = (paramId: number, newValue: string) => {
    this.setState((prevState) => ({
      params,
      modelValues: prevState.modelValues.map((item) =>
        item.paramId === paramId ? { ...item, value: newValue } : item
      ),
    }));
  };

  render() {
    return (
      <form>
        {this.state.params.map((param) => (
          <label key={param.id}>
            {param.name}
            <input
              type="text"
              value={
                this.state.modelValues.find((item) => item.paramId === param.id)
                  ?.value || ""
              }
              onChange={(event) =>
                this.onChangeHandler(param.id, event.target.value)
              }
            />
          </label>
        ))}
      </form>
    );
  }
}

const App = () => {
  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;
