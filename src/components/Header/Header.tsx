import Navigation from "@/components/Navigation";
import { QUERIES } from "breakpoints";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import styled from "styled-components";
import { SocialIcons } from "../Socials/Socials";

const Header = ({
    scrollDirection,
}: {
    scrollDirection: "up" | "down" | undefined;
}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <>
            <Overlay show={showSidebar} onClick={toggleSidebar}>
                <Sidebar show={showSidebar}>
                    <NavigationWrapper>
                        <Navigation />
                    </NavigationWrapper>
                    <IconWrapper>
                        <SocialIcons />
                    </IconWrapper>
                </Sidebar>
            </Overlay>
            <Wrapper scrollDirection={scrollDirection}>
                <Logo src="/images/logo.png" alt="Logo" />
                <Navbar>
                    <Navigation />
                </Navbar>

                <MenuButton>
                    <Hamburger toggled={showSidebar} onToggle={toggleSidebar} />
                </MenuButton>
            </Wrapper>
            <Banner>
                I’m Open to work! I’m currently looking for a full-time software
                engineering role for 2024
            </Banner>
        </>
    );
};

const NavigationWrapper = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    font-size: 24px;
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    ${QUERIES.tabletAndUp} {
        width: 80px;
        height: 80px;
    }
`;

interface IStyledProps {
    scrollDirection: "up" | "down" | undefined;
}

const Wrapper = styled.div<IStyledProps>`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.colors.background.blur};
    backdrop-filter: blur(10px);
    z-index: 999;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.3s ease-in-out;

    padding: 8px 16px;

    transform: translateY(
        ${({ scrollDirection }) => (scrollDirection === "down" ? "-100%" : "0")}
    );

    ${QUERIES.tabletAndUp} {
        padding: 8px 32px;
    }

    ${QUERIES.desktopAndUp} {
        padding-left: 64px;
        padding-right: 64px;
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
    z-index: 1000;
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
