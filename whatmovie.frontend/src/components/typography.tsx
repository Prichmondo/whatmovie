import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { BaseProps } from '../types/baseProps';
import { WithThemeProps } from '../types/theme';

export type TypographyColor = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'success'
  | 'warning';

export type TypographySize = 
  | 'sm'
  | 'md'
  | 'lg';

interface Props extends BaseProps {
  testid: string;
  textColor?: TypographyColor;
  textSize?: TypographySize;
  block?: boolean;
  hidden?: boolean;
  margin?: string;
  ellipsis?: boolean;
  bold?: boolean;
  italic?: boolean;
  onClick?: () => void;    
};

export const Typography = styled<FunctionComponent<Props>>((props: Props) => {
  const { children, component, textColor, textSize, block, hidden, margin, ellipsis, bold, italic, testid, ...rest } = props;

  if(hidden) {
      return null;
  }

  return (
    <TipographyStyle
      {...rest}
      as={component}
      data-testid={testid}
      data-size={textSize}
      data-color={textColor}
      data-block={block}
      data-ellipsis={ellipsis}
      data-bold={bold}
      data-italic={italic}
      style={{ margin: margin }}
      >
      {children}
    </TipographyStyle>
  )
})``;

Typography.defaultProps = {
  component: 'p',
  block: false
}

const TipographyStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`

    &[data-size="sm"]{ font-size: ${theme.typography.size.small} }
    &[data-size="md"]{ font-size: ${theme.typography.size.main} }
    &[data-size="lg"]{ font-size: ${theme.typography.size.large} }

    &[data-color="default"]{ color: ${theme.palette.secondary.lighter} }
    &[data-color="primary"]{ color: ${theme.palette.primary.main} }
    &[data-color="tertiary"]{ color: ${theme.palette.tertiary.lighter} }
    &[data-color="success"]{ color: ${theme.palette.success.main} }
    &[data-color="warning"]{ color: ${theme.palette.warning.main} }
    &[data-color="error"]{ color: ${theme.palette.error.main} }

    &[data-bold="true"]{ font-weight: 700 }
    &[data-italic="true"]{ font-style: italic; }

    &[data-ellipsis="true"]{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &[data-block="true"]{ display: block }
  `}
`;