import React from "react";
import { Select } from "antd";

type OptionType = {
  value: string;
  label: string;
  image?: string;
};

type SingleSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: OptionType[];
  placeholder?: string;
  style?: React.CSSProperties;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Please select",
  style = { width: "100%" },
}) => {
  return (
    <div className="common-singleSelect">
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        optionLabelProp="children"
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {option.image && (
                <img
                  src={option.image}
                  alt=""
                  width={28}
                  height={28}
                  style={{ borderRadius: 4 }}
                />
              )}
              <span>{option.label}</span>
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SingleSelect;
