import Navigation from "@/components/Navigation";
import { QUERIES } from "breakpoints";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import styled from "styled-components";

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <>
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Wrapper>
                <Logo src="/images/logo.png" alt="Logo" />
                <Navbar>
                    <Navigation />
                </Navbar>
                <Sidebar show={showSidebar}>
                    <Navigation />
                </Sidebar>
                <MenuButton>
                    <Hamburger toggled={showSidebar} onToggle={toggleSidebar} />
                </MenuButton>
            </Wrapper>
            <Banner>
                I’m Open to work! I’m currently looking for a software
                engineering internship for summer 2023.
            </Banner>
        </>
    );
};

const Logo = styled.img`
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    ${QUERIES.tabletAndUp} {
        width: 80px;
        height: 80px;
    }
`;

const Wrapper = styled.div`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 32px;

    ${QUERIES.tabletAndUp} {
        padding: 12px 32px;
    }

    ${QUERIES.desktopAndUp} {
        padding: 16px 64px;
    }
`;

const Navbar = styled.nav`
    display: none;
    align-items: center;

    ${QUERIES.desktopAndUp} {
        gap: 64px;
    }

    ${QUERIES.tabletAndUp} {
        gap: 36px;
        display: flex;
    }
`;

const Banner = styled.div`
    grid-area: banner;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.regular};
    padding: 8px 16px;
    text-align: center;
    font-size: 14px;

    ${QUERIES.tabletAndUp} {
        padding: 8px 32px;
    }
`;

const Sidebar = styled.nav<{ show: boolean }>`
    z-index: 999;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 32px;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;

    background-color: ${({ theme }) => theme.colors.background.regular};
    padding: 32px;

    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    ${({ show }) => show && "transform: translateX(0);"}

    ${QUERIES.tabletAndUp} {
        display: none;
    }
`;

const MenuButton = styled.button`
    display: block;

    ${QUERIES.tabletAndUp} {
        display: none;
    }
`;

const Overlay = styled.div<{ show: boolean }>`
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;

    ${({ show }) => show && "opacity: 1;"}
    ${({ show }) => show && "pointer-events: all;"}
`;

export default Header;
