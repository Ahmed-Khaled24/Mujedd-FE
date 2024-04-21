import { motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ItemContainer = styled(Link)<{ active?: boolean }>`
    display: flex;
    flex-direction: column;
    color: white;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-out;
    border-radius: 0.5rem;
    background-color: ${({ active }) =>
        active ? 'rgba(255, 255, 255, 0.075)' : 'transparent'};
    border: 2px solid transparent;
    border-color: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.1)' : '')};
    &:hover {
        background-color: rgba(255, 255, 255, 0.075);
        border-color: rgba(255, 255, 255, 0.1);
    }
`;

export const MainItemContent = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
`;

export const arrowStyles = css`
    margin-left: auto;
    box-sizing: content-box;
    aspect-ratio: 1;
    transition: all 0.2s ease-out;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

export const ArrowDown = styled(IoIosArrowDown)`
    ${arrowStyles}
`;

export const ArrowBack = styled(IoIosArrowBack)`
    ${arrowStyles}
`;

export const SubItemsContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const SubItemLink = styled(Link)<{ active?: boolean }>`
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    margin: 0 1rem;
    background-color: ${({ active }) =>
        active ? 'rgba(255, 255, 255, 0.125)' : 'transparent'};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: rgba(255, 255, 255, 0.125);
    }
`;
