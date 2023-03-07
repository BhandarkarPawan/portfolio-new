import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import styled from "styled-components";

const Navigation = () => {
    return (
        <>
            <NavLink href="#about">about</NavLink>
            <NavLink href="#projects">projects</NavLink>
            <NavLink href="#designs">designs</NavLink>
            <NavLink href="#contact">contact</NavLink>
            <DownloadLink href="files/resume.pdf" download>
                resume
                <FaDownload />
            </DownloadLink>
        </>
    );
};

const NavLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.regular};
    font-size: calc(20 / 16 * 1rem);
`;

const DownloadLink = styled(NavLink)`
    color: ${({ theme }) => theme.colors.text.dark};
    font-size: calc(20 / 16 * 1rem);
    display: flex;
    align-items: baseline;
    gap: 8px;
`;

export default Navigation;
