/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const footerWrapper = css`
    height: 50px;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Footer = () => {
    return <div css={footerWrapper}>
        Тестовое задание для Сбербанка. Все права защищены. 2020
    </div>
};

export default Footer;
