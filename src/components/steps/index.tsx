import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { StepWrapper } from './style';
import React from 'react';

interface ISteps {
    activeStep: 0 | 1;
}

const Steps: React.FC<ISteps> = ({ activeStep }) => {
    const steps = [
        'step 1',
        'step 2'
    ];

	return (
		<StepWrapper>
			<Box>
				<Stepper activeStep={activeStep}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Box>
		</StepWrapper>
	);
};

export default Steps;
