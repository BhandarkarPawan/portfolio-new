import styled from "styled-components";

export interface IProps {
    delegated?: any;
}

const Footer = ({ ...delegated }) => {
    return (
        <Wrapper>
            Designed and Developed by <strong>Pawan Bhandarkar</strong>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 128px;
    font-weight: 400;
    background-color: ${({ theme }) => theme.colors.background.dark};
    color: ${({ theme }) => theme.colors.primary};
    padding: 16px;
    text-align: center;
`;

export default Footer;
