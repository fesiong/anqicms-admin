import { SearchOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { AutoComplete, Input, InputRef } from 'antd';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useEffect, useRef, useState } from 'react';
import routes from '../../../config/routes';

import classNames from 'classnames';
import styles from './index.less';

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onOpenChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options?: AutoCompleteProps['options'];
  defaultOpen?: boolean;
  open?: boolean;
  defaultValue?: string;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { className, defaultValue, onOpenChange, placeholder, defaultOpen } = props;

  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  useEffect(() => {
    matchOptions('');
  }, []);

  const inputRef = useRef<InputRef | null>(null);

  const [value, setValue] = useMergedState<string | undefined>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const [searchMode, setSearchMode] = useMergedState(defaultOpen ?? false, {
    value: props.open,
    onChange: onOpenChange,
  });

  const onChangeValue = (value: string) => {
    setValue(value);
    matchOptions(value);
  };

  const onSearch = (value: string | undefined) => {
    const matches = matchOptions(value);
    if (matches.length > 0) {
      history.push(matches[0].path);
    }
  };

  const matchOptions = (value: string | undefined) => {
    const tmpOptions: AutoCompleteProps['options'] = [];
    for (let i in routes) {
      if (routes[i].routes) {
        for (let j in routes[i].routes) {
          if (
            routes[i].routes[j].name &&
            (!value || routes[i].routes[j].name.indexOf(value) !== -1)
          ) {
            tmpOptions.push({
              label: routes[i].routes[j].name,
              value: routes[i].routes[j].name,
              path: routes[i].routes[j].path,
            });
          }
        }
      } else if (routes[i].name && (!value || routes[i].name?.indexOf(value) !== -1)) {
        tmpOptions.push({
          label: routes[i].name,
          value: routes[i].name,
          path: routes[i].path,
        });
      }
    }
    setOptions(tmpOptions);

    return tmpOptions;
  };

  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });
  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onOpenChange) {
            onOpenChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        className={styles.searchIcon}
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        options={options}
        onChange={onChangeValue}
        onSelect={(value: string) => {
          onSearch(value);
        }}
      >
        <Input
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
