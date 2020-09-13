import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type InputSize = 
  | 'sm'
  | 'md'
  | 'lg';

interface Props extends React.HTMLProps<HTMLInputElement> {
  inputSize?: InputSize;
  block?: boolean;
  error?: boolean;
};

export const Input: React.FunctionComponent<Props> = (props: Props) => {
  const { inputSize, error, ref, as, block, ...rest } = props;
  return (
    <InputStyle
      {...rest}
      data-error={error}
      data-size={inputSize}
      data-block={block}
      />
  )
}

Input.defaultProps = {
  inputSize: 'md',
  block: false
}

const InputStyle = styled.input`
  ${({ theme }: WithThemeProps) => css`
      
    transition: background-color 0.4s ease;
    padding: 10px 15px;
    border-radius: ${theme.borderRadius.md};
    border: none;
    background-color: ${theme.palette.white.main};
    border: 1px solid ${theme.palette.white.main};

    &[disabled] {
      opacity: .8;
    }

    &[data-block="true"] {
      display: block;
      width: 100%;
    }

    &[data-error="true"] {
      color: ${theme.palette.error.main};
    }
    
    /* SIZES */
    &[data-size="sm"] {
      font-size: ${theme.typography.size.small};
      padding: 5px 7px;
    }

    &[data-size="lg"] {
      font-size: ${theme.typography.size.large};
      padding: 15px 20px;
    }
  `}
`;