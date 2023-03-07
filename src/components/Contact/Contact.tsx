import { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Highlight from "../Highlight/Highlight";
import SectionTitle from "../SectionTitle/SectionTitle";

export interface IProps {
    delegated?: any;
}

const Contact: React.FC<React.PropsWithChildren<IProps>> = ({
    children,
    ...delegated
}) => {
    const [message, setMessage] = useState("");

    return (
        <Wrapper {...delegated}>
            <Notepad>
                <Sticky />
                <Input
                    placeholder="Type your message here..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
            </Notepad>
            <Info>
                <TitleWrapper label="Get In Touch" side="right" />
                <Message>
                    If you would like to work together or discuss an opportunity
                    for work, please use the form or send me an email on{" "}
                    <Highlight>pawan@bhandarkar.me</Highlight>
                </Message>
                <StyledButton
                    onClick={() => {
                        window.open(
                            `mailto:pawan@bhandarkar.me?subject=Job Opportunity&body=${message}`
                        );
                    }}
                >
                    Send
                </StyledButton>
            </Info>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    grid-area: contact;
    place-self: center;
    display: flex;
    margin: 32px;
`;

const Notepad = styled.div`
    height: 300px;
    width: 428px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    font-weight: 400;
`;

const Sticky = styled.div`
    width: 100%;
    height: 40px;
    background-color: var(--color-sticky);
`;

const Input = styled.textarea`
    &::placeholder {
        color: var(--color-placeholder);
        

    flex: 1;
    background-color: transparent;
    border: none;
    height: 100%;
    padding: 32px;
    color: black;
    padding-right: 100px;
`;

const Info = styled.div`
    margin-left: -68px;
`;

const TitleWrapper = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
    margin-left: 100px;
`;

const Message = styled.p`
    background-color: ${({ theme }) => theme.colors.background.light};
    max-width: 600px;
    padding: 32px;
    border-radius: 8px;
`;

const StyledButton = styled(Button)`
    margin-left: 100px;
    margin-top: 16px;
`;

export default Contact;
