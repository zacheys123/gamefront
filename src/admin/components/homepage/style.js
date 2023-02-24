import styled from 'styled-components';

export const NAVS = styled.div`
	pointer-events: ${({ auth }) => (!auth ? 'visible' : 'none')};
	opacity: ${({ auth }) => (!auth ? '1' : '.7')};
`;
