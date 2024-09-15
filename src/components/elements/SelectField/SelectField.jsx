import React from 'react';
import Select, { components } from 'react-select';
import DownArrowIcon from '../../../assets/icons/down-arrow-icon.svg';
import UpArrowIcon from '../../../assets/icons/up-arrow-icon.svg';
import styles from './SelectField.module.scss';

const DropDownIcon = ({ isFocused }) => {
  console.log('isFocused', isFocused)
  return !isFocused ? (
    <div className={styles.dropDownIcon}>
      <img width={'11.97px'} height={'6.79px'} src={DownArrowIcon} />
    </div>
  ) : (
    <div className={styles.dropDownIcon}>
      <img width={'11.97px'} height={'6.79px'} src={UpArrowIcon} />
    </div>
  );
};

function SelectField({ field, options, isError, questionIndex }) {
  const customStyles = {
    // Customize the control (input area)
    control: (provided) => ({
      ...provided,
      width: '160px', // Remove padding
      height: '30px', // Set a fixed height for centering purposes
      display: 'flex', // Ensure flexbox for centering
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      textAlign: 'center', // Align text in the center
      fontSize: '20px',
      padding: '0 10px 0 10px', // Customize the border color
      borderColor: `${
        isError === null ? 'black' : isError === true ? 'red' : 'green'
      }`,
      ':hover': {
        borderColor: '#888', // Border color on hover
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: 'center', // Center the selected value text
      width: '100%',
      fontSize: '20px', // Make the text take the full width for centering
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '5px 20px 5px 5px',
      backgroundColor: state.isSelected ? '#ddd' : '#fff',
      ':hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: '260px',
      zIndex: 999999, // Set z-index to ensure menu appears above other elements
      position: 'absolute',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 999999, // Set z-index to ensure menu appears above other elements
      position: 'absolute', // Set z-index for the menu portal
    }),

    input: (provided) => ({
      ...provided,
      fontSize: '20px',
      height: '30px',
      display: 'flex', // Ensure flexbox for centering
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      textAlign: 'center',
    }),
  };
  const IndicatorsContainer = ({ children, ...props }) => {
    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('clicked');
    };
    return (
      <components.IndicatorsContainer {...props}>
        {children}
        {isError === null ? null : isError === true ? (
          <span
            style={{ marginLeft: '10px' }}
            className="feedback-symbol incorrect-symbol"
          >
            &#10060;
          </span>
        ) : (
          <span className="feedback-symbol correct-symbol">&#10004;</span>
        )}
      </components.IndicatorsContainer>
    );
  };
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      styles={customStyles}
      // defaultValue={options[0]}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={true}
      name="color"
      options={options}
      value={options?.find((c) => c.value === field.value) ?? ''}
      onChange={(val) => field.onChange(val?.value)}
      components={{
        IndicatorsContainer,
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => {
          return isError === null ? (
            <DropDownIcon isFocused={props.isFocused} />
          ) : null;
        },
      }}
      isDisabled={isError === null ? false : true}
      menuPlacement={questionIndex < 2 ? 'auto' : 'top'}
    />
  );
}

export default SelectField;
