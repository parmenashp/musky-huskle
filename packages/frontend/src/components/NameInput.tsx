import AsyncSelect from "react-select/async";

const NameInput = (props: any) => {
  return (
    <div className="selectInput">
      <AsyncSelect
        loadOptions={props.loadOptions}
        id={props.id ? props.id : "nameInput"}
        cacheOptions={true}
        defaultOptions={true}
        placeholder={props.placeholder ? props.placeholder : "Escolha"}
        noOptionsMessage={() => "Nenhum usuário encontrado"}
        isClearable={true}
        onChange={props.onChange ? props.onChange : (selected) => {console.log(selected)}}
        styles={
          {
            control: (styles) => ({
              ...styles,
              backgroundColor: "var(--menu-bg)",
              border: "0.25rem solid var(--menu-bg)",
              borderRadius: "0.25rem",
              height: "3rem",
              width: "18.75rem",
            }),
            input: (styles) => ({
              ...styles,
              color: "var(--placeholder)",
              fontSize: "1.125rem",
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "var(--placeholder)",
              fontSize: "1.125rem",
            }),
            placeholder: (styles) => ({
              ...styles,
              opacity: 1,
              color: "var(--placeholder)",
              fontSize: "1.125rem",
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: "var(--menu-bg)",
              borderRadius: "0.25rem",
              padding: "0 0.5rem",
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: state.isSelected || state.isFocused ? "var(--placeholder)" : "var(--menu-bg)",
              borderRadius: "0.25rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0.5rem 0",
            })
          }
        }
      />
    </div>
  );
};

export default NameInput;