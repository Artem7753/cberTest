/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

const siteTitle = css`
    pointer-events: none;
`;

const AppHeader = () => {
    const history = useHistory();
    const [current, setCurrent] = useState(
        window.location.pathname
    );

    // type MenuClickEventHandler has no exported from antd
    const handleClick = (e: any) => {
        setCurrent(e.key);
        history.push(e.key);
    };

    return (
        <Menu
            onClick={(e) => handleClick(e)}
            selectedKeys={[current]}
            mode="horizontal"
        >
            <Menu.Item css={siteTitle}>Конвертер валют</Menu.Item>
            <Menu.Item key="/">Главная</Menu.Item>
            <Menu.Item key="/converter">Конвертер</Menu.Item>
        </Menu>
    );
};

export default AppHeader;
