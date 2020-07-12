/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core'

export const GlobalStyle = (
    <Global
        styles={css`
            #root {
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }
        `}
    />
);
