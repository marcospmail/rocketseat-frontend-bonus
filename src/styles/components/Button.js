import styled, { css } from 'styled-components';
import { darken } from 'polished';

const sizes = {
  small: css`
    height: 28px;
    font-size: 12px;
  `,
  default: css`
    height: 36px;
    font-size: 14px;
  `,
  big: css`
    height: 44px;
    font-size: 18px;
  `,
};

const colors = {
  default: css`
    background: #7289da;

    &:hover {
      background: ${darken(0.1, '#7289da')};
    }
  `,
  danger: css`
    background: #e04848;

    &:hover {
      background: ${darken(0.1, '#e04848')};
    }
  `,
  gray: css`
    background: #b9bbbe;

    &:hover {
      background: ${darken(0.1, '#b9bbbe')};
    }
  `,
};

const Button = styled.button`
  border-radius: 3px;
  transition: background-color 0.15s ease;
  background: #7289da;
  border: 0;
  color: #fff;
  font-size: 12px;
  padding: 0 10px;
  text-transform: uppercase;
  font-weight: 700;

  ${props => sizes[props.size || 'default']}
  ${props => colors[props.color || 'default']}

  ${props =>
    props.filled === false &&
    css`
      background: none;
      color: rgba(255, 255, 255, 0.3);

      &:hover {
        background: none;
        opacity: 0.6;
      }
    `}
`;

export default Button;
