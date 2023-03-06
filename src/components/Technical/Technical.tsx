import { QUERIES } from "@/pages/breakpoints";
import { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../SectionTitle/SectionTitle";
import { SKILLS } from "./skills";

const Technical: React.FC = () => {
    const [active, setActive] = useState(0);
    const activeSkill = SKILLS[active];

    const Stars = [];
    for (let i = 0; i < activeSkill.level; i++) {
        Stars.push(<Star key={i} />);
    }

    for (let i = 0; i < 5 - activeSkill.level; i++) {
        Stars.push(<EmptyStar key={i} />);
    }

    return (
        <Wrapper>
            <Display>
                <Title>{activeSkill.name}</Title>
                <Content>{activeSkill.content}</Content>
                <Level>{Stars}</Level>
            </Display>
            <SkillList>
                <TechnicalTitle label="Technical Skills" side="right" />
                <Options>
                    {SKILLS.map((skill, index) => (
                        <Option
                            key={skill.name}
                            onClick={() => setActive(index)}
                            onMouseEnter={() => setActive(index)}
                            active={index === active}
                        >
                            {skill.name}
                        </Option>
                    ))}
                </Options>
            </SkillList>
        </Wrapper>
    );
};

interface OptionProps {
    active: boolean;
}

const Wrapper = styled.div`
    grid-area: technical;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
    background-color: ${({ theme }) => theme.colors.background.dark};

    ${QUERIES.tabletAndUp} {
        flex-direction: row;
    }
`;

const TechnicalTitle = styled(SectionTitle)`
    width: 100%;
    margin-bottom: 32px;
`;

const Display = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: 0px;
    padding: 32px;
    max-width: 700px;
    height: 320px;

    margin-left: -32px;
    margin-right: -32px;

    ${QUERIES.tabletAndUp} {
        padding-right: 250px;
        margin-left: 0;
        margin-right: 0;
        border-radius: 8px;
    }
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
    font-weight: 400;
`;

const Level = styled.div`
    display: flex;
    margin-top: auto;
    gap: 8px;
`;

const SkillList = styled.div`
    max-width: 600px;
    margin-top: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: -232px;
    }
`;

const Options = styled.ul`
    max-width: 800px;
    gap: 8px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

    ${QUERIES.tabletAndUp} {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
`;

const Option = styled.li<OptionProps>`
    cursor: pointer;
    background-color: ${({ theme, active }) =>
        active ? theme.colors.primary : theme.colors.text.light};
    color: ${({ theme }) => theme.colors.background.dark};
    padding: 12px 32px;
    font-size: calc(24 / 16 * 1rem);
    text-align: center;

    ${QUERIES.tabletAndUp} {
        padding: 4px 32px;
        font-size: calc(14 / 16 * 1rem);
    }
`;

const Star = styled.div`
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    margin-right: 4px;
`;

const EmptyStar = styled(Star)`
    background-color: ${({ theme }) => theme.colors.text.light};
`;

export default Technical;
